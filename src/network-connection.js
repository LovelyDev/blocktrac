import config  from './config'
import Network from './mixins/network'

const xdr_to_json = require('json-xdr').toJSON
const jsonpath = require('./vendor/jsonpath')

// XXX: import XLM meta mixin to access operation helpers below
const XLMMeta = require("./components/tx_summaries/xlm/meta")

///

var connect_callbacks = []

function call_connected_callbacks(){
  connect_callbacks.forEach(function(cb){
    cb();
  });

  connect_callbacks = [];
}

///

function is_xrp(){
  return Network.computed.is_xrp();
}

function is_xlm(){
  return Network.computed.is_xlm();
}

///

// XXX: Conversion functions copied from ziti/workers/listen_to_txs/*

function convert_xrp_tx(tx){
  tx = {transaction : tx};
  tx.meta = tx.transaction.meta;
  delete tx.transaction.meta;
  return tx
}

function convert_xlm_tx(tx, StellarSdk){
  delete tx._links;

  // these are functions:
  delete tx.ledger;
  delete tx.self;
  delete tx.account;
  delete tx.operations;
  delete tx.effects;
  delete tx.precedes;
  delete tx.succeeds;
  delete tx.transaction;

  // Convert envelope, result_meta, result from xdr to json
  tx.envelope    = xdr_to_json(StellarSdk.xdr.TransactionEnvelope.fromXDR(tx.envelope_xdr, 'base64'));
  tx.result_meta = xdr_to_json(StellarSdk.xdr.TransactionMeta.fromXDR(tx.result_meta_xdr,  'base64'));
  tx.result      = xdr_to_json(StellarSdk.xdr.TransactionResult.fromXDR(tx.result_xdr,     'base64'));

  // XXX: convert assetCodes from xdr to strings
  jsonpath.apply(tx.envelope,    "$..alphaNum4.assetCode",  (c) => StellarSdk.xdr.AssetCode4.fromXDR(c,  'base64').toString().replace(/\0/g, ''))
  jsonpath.apply(tx.result_meta, "$..alphaNum4.assetCode",  (c) => StellarSdk.xdr.AssetCode4.fromXDR(c,  'base64').toString().replace(/\0/g, ''))
  jsonpath.apply(tx.result,      "$..alphaNum4.assetCode",  (c) => StellarSdk.xdr.AssetCode4.fromXDR(c,  'base64').toString().replace(/\0/g, ''))

  jsonpath.apply(tx.envelope,    "$..alphaNum12.assetCode", (c) => StellarSdk.xdr.AssetCode12.fromXDR(c, 'base64').toString().replace(/\0/g, ''))
  jsonpath.apply(tx.result_meta, "$..alphaNum12.assetCode", (c) => StellarSdk.xdr.AssetCode12.fromXDR(c, 'base64').toString().replace(/\0/g, ''))
  jsonpath.apply(tx.result,      "$..alphaNum12.assetCode", (c) => StellarSdk.xdr.AssetCode12.fromXDR(c, 'base64').toString().replace(/\0/g, ''))

  // XXX: covert ED25519 keys to common addresses
  jsonpath.apply(tx.envelope,    "$..ed25519", (c) => (new StellarSdk.Keypair({type: "ed25519", publicKey: Buffer.from(c, 'base64')})).publicKey())
  jsonpath.apply(tx.result_meta, "$..ed25519", (c) => (new StellarSdk.Keypair({type: "ed25519", publicKey: Buffer.from(c, 'base64')})).publicKey())
  jsonpath.apply(tx.result,      "$..ed25519", (c) => (new StellarSdk.Keypair({type: "ed25519", publicKey: Buffer.from(c, 'base64')})).publicKey())

  return tx;
}

// Wrap transaction in similar manner as ziti/workers/run_filters_workers

function wrap_tx(tx){
  return {transaction : tx};
}

///

export default {
  install(Vue, options) {
    Vue.prototype.network = {connected : false}

    // Initialize XRP Connection
    if(is_xrp()){
      const RippleAPI = require('ripple-lib').RippleAPI;
      Vue.prototype.network.RippleAPI = RippleAPI;
      Vue.prototype.network.ripple_api = new RippleAPI({
        server: config.NETWORK_URIS[config.NETWORK]
      });

      Vue.prototype.network.ripple_api.on("error", function(err){
        Vue.prototype.network.connected = false;

        // FIXME: auto-reconnect
      });

      Vue.prototype.network
                   .ripple_api
                   .connect()
                   .then(function(){
                     Vue.prototype.network.connected = true;
                     call_connected_callbacks();
                   })
    }

    // Initialize XLM Connection
    if(is_xlm()){
      const StellarSdk = require('stellar-sdk')
      Vue.prototype.network.StellarSdk = StellarSdk;
      Vue.prototype.network.stellar_server =
        new StellarSdk.Server(config.NETWORK_URIS[config.NETWORK]);

      Vue.prototype.network.connected = true;
      call_connected_callbacks();

      // TODO periodically test stellar connection, disconnect if not available, auto-reconnect
    }

    // Validate network address
    Vue.prototype.network.is_valid_address = function(id){
      if(is_xrp())
        return this.ripple_api.isValidAddress(id);

      if(is_xlm())
        return this.StellarSdk.StrKey.isValidEd25519PublicKey(id);
    }

    // Register connection callback, invoke immediate if already connected
    Vue.prototype.network.on_connection = function(cb){
      if(Vue.prototype.network.connected)
        cb();

      else
        connect_callbacks.push(cb);
    }

    // Retrieve account specified id, invoking callback w/ result
    Vue.prototype.network.account = function(id, cb){
      this.on_connection(function(){
        if(is_xrp()){
          this.ripple_api
              .getAccountInfo(id)
              .then(function(account){
                var obj = {}
                obj.balance  = account.xrpBalance;
                obj.sequence = account.sequence;
                obj.previous_txn = account.previousAffectingTransactionID;
                cb(obj)
              })
        }

        if(is_xlm()){
          const account_p = this.stellar_server
                                .accounts()
                                .accountId(id)
                                .call()

          const tx_p = this.stellar_server
                           .transactions()
                           .forAccount(id)
                           .limit(1)
                           .order('desc')
                           .call()

          Promise.all([account_p, tx_p])
                 .then(function(result){
                   const account = result[0];
                   const      tx = result[1].records[0];

                   var obj = {}
                   obj.balance  = account.balances.find((b) => (b.asset_type == 'native')).balance
                   obj.sequence = account.sequence
                   obj.previous_txn = tx.id;
                   cb(obj)
                 })
        }
      }.bind(this))
    }

    // Retrieve transaction specified id, invoking callback w/ result
    Vue.prototype.network.tx = function(id, cb){
      this.on_connection(function(){
        if(is_xrp()){
          this.ripple_api
              .request('tx', {
                'transaction' : id
              }).then(function(tx){
                cb(wrap_tx(convert_xrp_tx(tx)))
              })
        }

        if(is_xlm()){
          this.stellar_server
              .transactions()
              .transaction(id)
              .call()
              .then(function(tx){
                cb(wrap_tx(convert_xlm_tx(tx, this.StellarSdk)))
              }.bind(this))
        }

      }.bind(this))
    }

    // Transactions stream callback,
    // See usage in stream_txs / stop_streaming_txs below
    var txs_cb = null;

    // Stream transactions, registering callback to be invoked w/ each.
    // Wrap / Convert transactions in same fashion as ziti.
    // Set fields used internally in zitui.
    // Freeze transaction objects to improve performance.
    Vue.prototype.network.stream_txs = function(cb){
      this.on_connection(function(){
        if(is_xrp()){
          txs_cb = cb;

          this.ripple_api
              .connection
              .on('transaction', function(tx){
                var wrapped = wrap_tx(tx);
                const type = wrapped.transaction.transaction.TransactionType;
                wrapped.category = config.tx_category_for_type(type);
                wrapped.hash = wrapped.transaction.transaction.hash;

                Object.freeze(wrapped);
                cb(wrapped)
              })

          this.ripple_api
              .request('subscribe', {
                'streams' : ['transactions']
              })
        }

        if(is_xlm()){
          txs_cb =
            this.stellar_server
                .transactions()
                .cursor('now')
            .stream({
              onmessage : function(tx){
                var wrapped = wrap_tx(convert_xlm_tx(tx, this.StellarSdk));
                const meta = Object.assign({tx : wrapped.transaction}, XLMMeta)
                wrapped.category = config.tx_category_for_type(meta.operation_type)
                wrapped.hash = wrapped.transaction.hash;

                Object.freeze(wrapped);
                cb(wrapped)
              }.bind(this)
            })
        }
      }.bind(this))
    }

    // Stop streaming transactions, removes registered stream callback
    Vue.prototype.network.stop_streaming_txs = function(){
      this.on_connection(function(){
        if(is_xrp()){
          this.ripple_api.off('transaction', txs_cb);

          this.ripple_api
              .request('unsubscribe', {
                'stream' : ['transactions']
              })
        }

        if(is_xlm()){
          // Call method returned by stream to stop streaming
          txs_cb();
        }

        txs_cb = null;
      }.bind(this))
    }
  }
}
