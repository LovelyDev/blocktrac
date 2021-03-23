// XRP Network Connection Adapter Module

const RippleAPI = require('ripple-lib').RippleAPI;

// XXX: Only used in the one-off transaction retrieval.
// FIXME: In ziti ledgers are streamed and transactions read
//        through those, facilitating a need to convert.
//        Here transactions are streamed directly and converting
//        the resulting format would result in incorrect structure.
//        We should unify this and stream ledgers here in a similar
//        manner to ziti.
function convert_tx(tx){
  tx = {transaction : tx};
  tx.meta = tx.transaction.meta;
  delete tx.transaction.meta;
  return tx
}

// Initialize module
function init(){
  this.ripple_api = new RippleAPI({
    server: this.vue.active_network_uri
  });

  this.ripple_api.on("error", function(err){
    this.connected = false;
    this._call_disconnect_callbacks();
    throttle_connection.bind(this)();
  }.bind(this));
}

// Initiate XRP Connection
function connect(){
  this.ripple_api
      .connect()
      .then(function(){
        this.connected = true;
        this._call_connected_callbacks();

      }.bind(this)).catch(function(){
        throttle_connection.bind(this)();
      }.bind(this))
}

// Throttle XRP Connection Initialization
var connecting = false;
function throttle_connection(){
  if(connecting) return;
  connecting = true;

  setTimeout(function(){
    connecting = false;
    connect.bind(this)();
  }.bind(this), 1000);
}

// Validate XRP address
function validate_address(id){
  return this.ripple_api.isValidAddress(id);
}

// Retrieve XRP account
function retrieve_account(id, cb){
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

// Retrieve XRP transaction
function retrieve_tx(id, cb){
  this.ripple_api
      .request('tx', { 'transaction' : id }
      ).then(function(tx){
        cb(this.wrap_tx(convert_tx(tx)))
      }.bind(this))
}

// Transactions stream callback,
// See usage in stream_txs / stop_streaming_txs below
var txs_cb = null;

// Stream XRP transactions
function stream_txs(cb){
  if(txs_cb)
    this.ripple_api
        .connection
        .off('transaction', txs_cb);

  txs_cb = function(tx){
    // Wrap / Convert transactions in same fashion as ziti
    var wrapped = this.wrap_tx(tx);

    // Set fields used internally in zitui
    const type = wrapped.transaction.transaction.TransactionType;
    wrapped.category = config.tx_category_for_type(type);
    wrapped.hash = wrapped.transaction.transaction.hash;

    // Freeze transaction objects to improve performance
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

// Stop streaming XRP transactions
function stop_streaming_txs(){
  this.ripple_api
      .connection
      .off('transaction', txs_cb);

  this.ripple_api
      .request('unsubscribe', {
        'stream' : ['transactions']
      })

  // Reset callbacks
  txs_cb = null;
}

///

module.exports = {
  init,
  connect,
  validate_address,
  retrieve_account,
  retrieve_tx,
  stream_txs,
  stop_streaming_txs
}
