import Vue from 'vue'
import Vuex from 'vuex'

import config from './config'

var jsonpath = require('./vendor/jsonpath')

Vue.use(Vuex)

jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

export const store = new Vuex.Store({
  state : {
    // TODO: these should be set by membership level
       multiple_sinks : true,
    instant_supported : true,
          sms_enabled : true,
      webhook_enabled : true,

    // TODO: should be determined by account balance
    //       (0 = basic, minimum = premium)
    membership_level : 'basic',

            txs : [],
    loading_txs : true,
     paused_txs : false,
      tx_filter : '',

    callbacks : {
      socket_open : [],
      socket_msg  : [],
         commands : {}
    },

    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },

  mutations: {
    toggle_paused_txs(state){
      state.paused_txs = !state.paused_txs;
    },

    update_tx_filter(state, filter){
      state.tx_filter = filter;

      if(!filter) return;

      // remove txs that don't match filter
      for(var i = state.txs.length-1; i >= 0 ; i--){
        if(jsonpath.query(state.txs[i], filter).length == 0){
          state.txs.splice(i, 1);
        }
      }
    },

    add_tx(state, tx){
      if(state.paused_txs) return;

      if(state.tx_filter)
        if(jsonpath.query(tx, state.tx_filter).length == 0)
          return;

      state.loading_txs = false;

      // making message reactive slows down perf
      Object.freeze(tx);

      state.txs.unshift(tx);
      state.txs.splice(config.TX_HISTORY, state.txs.length - config.TX_HISTORY);
    },

    ///

    on_open_socket(state, cb) {
      if(state.socket.isConnected){
        cb();
        return;
      }

      state.callbacks.socket_open.push(cb);
    },

    on_socket_message(state, cb){
      state.callbacks.socket_msg.push(cb);
    },

    SOCKET_ONOPEN (state) {
      state.socket.isConnected = true
      state.callbacks.socket_open.forEach(function(cb){
        cb();
      });
    },

    SOCKET_ONCLOSE (state, ) {
      state.socket.isConnected = false
    },

    SOCKET_ONERROR ()  {
    },

    SOCKET_ONMESSAGE (state, message)  {
      if(message.id && state.callbacks.commands[message.id]){
        state.callbacks.commands[message.id](message["result"]);
        delete state.callbacks.commands[message.id];
      }

      state.callbacks.socket_msg.forEach(function(cb){
        cb(message);
      });
    },

    SOCKET_RECONNECT() {
    },

    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    }
  }
});
