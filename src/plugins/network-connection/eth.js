/*
 * Network Connection Plugin
 * ETH Adapter Module
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

const ethers = require("ethers");

const {wrap_tx} = require("../../util").default

// Prepare statically received tx for internal processing
function prepare_static_tx(tx){
}

// Prepare streamed tx for internal processing
function prepare_streamed_tx(tx){
}

// Initialize module
function init(){
}

// Reset module
function reset(){
}

// Initiate ETH Connection
function connect(){
}

// Validate ETH Address
function validate_address(id){
}

// Retrieve ETH account
function retrieve_account(id, cb){
}

// Retrieve ETH transaction
function retrieve_tx(id, cb){
}

// Stream ETH transactions
function stream_txs(cb){
}

// Stop streaming ETH transactions
function stop_streaming_txs(){
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
