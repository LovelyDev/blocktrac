/*
 * Network Connection Plugin
 * BTC Adapter Module
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

const BScript      = require('bscript-parser');
const { validate } = require('bitcoin-address-validation');

const {wrap_tx} = require("../../util").default
const ziti = require('../../config/ziti')

// XXX: BTC conversion function copied from ziti/workers/listen_to_txs/btc
function convert_tx(tx){
  var total_in  = 0;
  var total_out = 0;

  tx.out.forEach(function(output){
    output.script = BScript.rawToAsm(output.script)
    total_out += output.value;
  })

  tx.inputs.forEach(function(input){
    //input.script = BScript.rawToAsm(input.script, 'hex')
    if(input.prev_out){
      input.prev_out.script = BScript.rawToAsm(input.prev_out.script)
      total_in += input.prev_out.value;
    }
  })

  tx.total_in  = total_in;
  tx.total_out = total_out;

  return tx;
}

// Prepare statically received tx for internal processing
function prepare_static_tx(tx){
  return wrap_tx(convert_tx(tx))
}

// Prepare streamed tx for internal processing
function prepare_streamed_tx(tx){
  // Wrap / Convert transactions in same fashion as ziti
  var prepared = wrap_tx(convert_tx(tx));

  prepared.hash = prepared.transaction.hash;

  return prepared;
}

// Initialize module
function init(){
  // Stubbed for module API compatability
}

// Reset module
function reset(){
  stop_streaming_txs.bind(this)();
  this.connected = false;
}

// Initiate BTC Connection
function connect(){
  // Clear txs and then load initial batch
  this.vue.$store.commit('clear_txs')
  this.vue.load_txs(this.vue.active_blockchain)
          .then(function(txs){
            txs.forEach(function(tx){
              this.vue.$store.commit('add_tx', wrap_tx(tx))
            }.bind(this))
          }.bind(this))
}

// Validate BTC Address
function validate_address(id){
  return validate(id);
}

// Retrieve BTC account
function retrieve_account(id, cb){
  const uri = this.vue.active_network_uri.account.replace("ADDR", id)
  this.vue.$htttp().get(uri, {timeout : ziti.timeouts.request})
                   .then(function(account){
                     var obj = {};
                     obj.balance = account.final_balance;
                     obj.sequence = account.n_tx;
                     obj.previous_txn = account.txs[0].hash;
                     cb(obj)
                   })
}

// Retrieve BTC transaction
function retrieve_tx(id, cb){
  const uri = this.vue.active_network_uri.tx.replace("HASH", id)
  this.vue.$htttp().get(uri, {timeout : ziti.timeouts.request})
                   .then(function(tx){
                     cb(prepare_static_tx(tx))
                   })
}

// TXs streaming interval
var txs_interval = null;

// Stream BTC transactions
function stream_txs(cb){
  txs_interval = setInterval(function(){
    // Get latest block
    this.vue.$htttp().get(this.vue.active_network_uri.latest_block, 
                               {timeout : config.timeouts.request})
                     .then(function(current){
                       // Retrieve block w/ transactions
                       const uri = this.vue.active_netwokr_uri.block_n.replace("HASH", current.hash)
                       this.$htttp().get(uri, {timeout : config.timeouts.request})
                                    .then(function(block){
                                      // Iterate over txs, prepare, and invoke callback
                                      block.tx.forEach(function(tx){
                                        const prepared = prepare_streamed_tx(tx);

                                        // Freeze transaction objects to improve performance
                                        Object.freeze(prepared);

                                        cb(prepared)
                                      }.bind(this))
                                    })
                     }.bind(this))
  }.bind(this), ziti.worker_delays.pow_block)
}

// Stop streaming BTC transactions
function stop_streaming_txs(){
  if(txs_interval){
    clearInteval(txs_interval);
    txs_interval = null;
  }
}

///

module.exports = {
  prepare_static_tx,
  prepare_streamed_tx,

  init,
  reset,
  connect,
  validate_address,
  retrieve_account,
  retrieve_tx,
  stream_txs,
  stop_streaming_txs
}
