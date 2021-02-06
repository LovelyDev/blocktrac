import config  from './config'
import Network from './mixins/network'

const {simplify} = require("ezxlm")

// XXX: import XLM operations helper for use below
const XLMOperations = require("./components/tx_summaries/xlm/operations").default;

///

var connected = false;
var connect_callbacks = []
var disconnect_callbacks = []

function call_connected_callbacks(){
  connect_callbacks.forEach(function(cb){
    cb();
  });
}

function call_disconnect_callbacks(){
  disconnect_callbacks.forEach(function(cb){
    cb();
  });
}

///

function is_xrp(){
  return Network.computed.is_xrp();
}

function is_xlm(){
  return Network.computed.is_xlm();
}

///

// XXX: Only used in the one-off transaction retrieval.
// FIXME: In ziti ledgers are streamed and transactions read
//        through those, facilitating a need to convert.
//        Here transactions are streamed directly and converting
//        the resulting format would result in incorrect structure.
//        We should unify this and stream ledgers here in a similar
//        manner to ziti.
function convert_xrp_tx(tx){
  tx = {transaction : tx};
  tx.meta = tx.transaction.meta;
  delete tx.transaction.meta;
  return tx
}

// XXX: XLM conversion function copied from ziti/workers/listen_to_txs/*
function convert_xlm_tx(tx){
  return simplify(tx);
}

// Wrap transaction in similar manner as ziti/workers/run_filters_workers

function wrap_tx(tx){
  return {transaction : tx};
}

///

export default {
  install(Vue, options) {
    Vue.prototype.network = {}

    // Initialize XRP API
    function init_xrp(){
      const RippleAPI = require('ripple-lib').RippleAPI;
      Vue.prototype.network.RippleAPI = RippleAPI;
      Vue.prototype.network.ripple_api = new RippleAPI({
        server: config.NETWORK_URIS[config.NETWORK]
      });

      Vue.prototype.network.ripple_api.on("error", function(err){
        connected = false;
        call_disconnect_callbacks();
        throttle_xrp_connection();
      });
    }

    // Initiate XRP Connection
    function connect_to_xrp(){
      Vue.prototype.network
                   .ripple_api
                   .connect()
                   .then(function(){
                     connected = true;
                     call_connected_callbacks();
                   }).catch(function(){
                     throttle_xrp_connection();
                   })
    }

    // Throttle XRP Connection Initialization
    var xrp_connecting = false;
    function throttle_xrp_connection(){
      if(xrp_connecting) return;
      xrp_connecting = true;

      setTimeout(function(){
        xrp_connecting = false;
        connect_to_xrp();
      }, 1000);
    }

    ///

    // Initiate XLM Connection
    function connect_to_xlm(){
      const StellarSdk = require('stellar-sdk')
      Vue.prototype.network.StellarSdk = StellarSdk;
      Vue.prototype.network.stellar_server =
        new StellarSdk.Server(config.NETWORK_URIS[config.NETWORK]);

      // Start testing XLM connection
      test_xlm_connection();
      setInterval(test_xlm_connection, 5000);
    }

    // Periodically poll server, handle connection failures
    function test_xlm_connection(){
      Vue.prototype.network.stellar_server.fetchBaseFee()
         .then(function(fee){
           if(!connected){
             connected = true;
             call_connected_callbacks();
           }

         }).catch(function(){
           if(connected){
             connected = false;
             call_disconnect_callbacks();
           }
         })
    }

    ///

    // Connect to appropriate network

    if(is_xrp()){
      init_xrp();
      connect_to_xrp();
    }

    if(is_xlm()){
      connect_to_xlm();
    }

    ///

    // Connected accessor
    Vue.prototype.network.is_connected = function(){
      return connected;
    }

    // Register connection callback, invoke immediate if already connected
    Vue.prototype.network.on_connection = function(cb){
      connect_callbacks.push(cb);

      if(connected)
        cb();
    }

    // Register disconnection callback, invoke immediate if already connected
    Vue.prototype.network.on_disconnection = function(cb){
      disconnect_callbacks.push(cb);

      if(!connected)
        cb();
    }

    ///

    // Validate network address
    Vue.prototype.network.is_valid_address = function(id){
      if(is_xrp())
        return this.ripple_api.isValidAddress(id);

      if(is_xlm())
        return this.StellarSdk.StrKey.isValidEd25519PublicKey(id);
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
                cb(wrap_tx(convert_xlm_tx(tx)))
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
          if(txs_cb)
            this.ripple_api
                .connection
                .off('transaction', txs_cb);

          txs_cb = function(tx){
            var wrapped = wrap_tx(tx);
            const type = wrapped.transaction.transaction.TransactionType;
            wrapped.category = config.tx_category_for_type(type);
            wrapped.hash = wrapped.transaction.transaction.hash;

            Object.freeze(wrapped);
            cb(wrapped)
          }

          this.ripple_api
              .connection
              .on('transaction', txs_cb)

          this.ripple_api
              .request('subscribe', {
                'streams' : ['transactions']
              })
        }

        if(is_xlm()){
          if(txs_cb)
            txs_cb();

          txs_cb =
            this.stellar_server
                .transactions()
                .cursor('now')
            .stream({
              onmessage : function(tx){
                var wrapped = wrap_tx(convert_xlm_tx(tx));
                const operation = XLMOperations.prioritized(XLMOperations.all(wrapped.transaction)).__type;
                wrapped.category = config.tx_category_for_type(operation);
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
          this.ripple_api
              .connection
              .off('transaction', txs_cb);

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
