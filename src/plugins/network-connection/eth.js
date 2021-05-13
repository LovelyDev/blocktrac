/*
 * Network Connection Plugin
 * ETH Adapter Module
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

const ethers = require("ethers");

const {wrap_tx} = require("../../util").default
const ziti = require('../../config/ziti')

// Prepare statically received tx for internal processing
function prepare_static_tx(tx){
  return wrap_tx(tx);
}

// Prepare streamed tx for internal processing
function prepare_streamed_tx(tx){
  var prepared = wrap_tx(tx);

  prepared.hash = prepared.transaction.hash

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

  // XXX: same ugly hack to cleanup provider polling
  //      as from ziti workers/listen_to_txs/eth module
  if(this.provider && this.provider._poller)
    clearInterval(this.provider._poller);
}

// Initiate ETH Connection
function connect(){
  this.provider = new ethers.providers.JsonRpcProvider({
    url : this.vue.active_network_uri,
    timeout : ziti.timeouts.request
  });

  this.connected = true;

  this.provider.on("error", async function(err){
    this.connected = false;
    this._call_disconnected_callbacks();
    throttle_connection.bind(this)();
  }.bind(this))

  this.provider.on("close", async function(){
    this.connected = false;
    this._call_disconnected_callbacks();
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

// Validate ETH Address
function validate_address(id){
  try{
    return !!ethers.utils.getAddress(id);
  }catch(err){
    return false;
  }
}

// Retrieve ETH account
function retrieve_account(id, cb){
  // TODO: how to get previous_txs (?)
  var obj = {previous_txn : ''};

  const balance =
    this.provider.getBalance(id)
                 .then(function(balance){
                   obj.balance = balance;
                 })

  const seq =
    this.provider.getTransactionCount(id)
                 .then(function(count){
                   obj.sequence = count
                 })

  Promise.all([balance, seq])
         .then(function(){
           cb(obj)
         })
}

// Retrieve ETH transaction
function retrieve_tx(id, cb){
  this.provider.getTransaction(id)
               .then(function(tx){
                 cb(prepare_static_tx(tx))
               })
}

// Stream ETH transactions
function stream_txs(cb){
  this.provider.on("block", function(number){
    this.provider.getBlockWithTransactions(number)
                 .then(function(block){
                    block.transactions.forEach(function(tx){
                      tx.date = new Date(block.timestamp * 1000);
                      const prepared = prepare_streamed_tx(tx);

                      // Freeze transaction objects to improve performance
                      Object.freeze(prepared);

                      cb(prepared)
                    })
                  }.bind(this))
  }.bind(this));
}

// Stop streaming ETH transactions
function stop_streaming_txs(){
  this.provider.off("block");
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
