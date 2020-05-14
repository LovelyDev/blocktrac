import Vue  from 'vue'
import Vuex from 'vuex'

import config from './config'
import util   from './util'

var jsonpath = require('./vendor/jsonpath')

Vue.use(Vuex)

jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

export const store = new Vuex.Store({
  state : {
            txs : [],
    loading_txs : true,
     paused_txs : false,
      tx_filter : '',

          tx_categories : [],
    tx_category_tallies : config.TX_CATEGORIES
                                .reduce(function(tallies, category, i){
                            tallies[category] = 0;
                            return tallies;
                          }, {}),

        templates : [],
          filters : [],
      matched_txs : [],

    active_filter : {},
    in_progress_filter : {},

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
      // If filter not valid jsonpath, return
      if(filter && !util.is_valid_jsonpath(filter))
        return

      // Set jsonpath
      state.tx_filter = filter;

      // If blank, return
      if(!filter) return;

      // Remove txs that don't match filter
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

      var category = config.tx_category_for_type(tx["transaction"]["TransactionType"]);
      if(state.tx_categories.length != 0 &&
        !state.tx_categories.includes(category))
        return;

      state.loading_txs = false;

      // making message reactive slows down perf
      Object.freeze(tx);

      // Add to txs list and cap number
      state.txs.unshift(tx);
      state.txs.splice(config.TX_HISTORY, state.txs.length - config.TX_HISTORY);

      // Update tallies
      state.tx_category_tallies['ALL']    += 1;
      state.tx_category_tallies[category] += 1;
    },

    clear_tx_categories(state, category){
      state.tx_categories = [];
    },

    toggle_tx_category(state, category){
      // Toggle category selection
      if(state.tx_categories.includes(category)){
        const index = state.tx_categories.indexOf(category);
        state.tx_categories.splice(index, 1);

      }else
        state.tx_categories.push(category);

      // Filter txs by category
      state.txs = state.txs.filter(function(tx){
        var category = config.tx_category_for_type(tx["transaction"]["TransactionType"]);
        return(state.tx_categories.length == 0 ||
               state.tx_categories.includes(category))
      })
    },

    clear_txs(state, filter){
      state.txs = [];
    },

    ///

    set_templates(state, templates){
      state.templates = templates;
    },

    set_filters(state, filters){
      state.filters = filters;
    },

    set_matched_txs(state, matched_txs){
      state.matched_txs = matched_txs;
    },

    set_active_filter(state, filter){
      state.active_filter = filter;
    },

    set_in_progress_filter(state, filter){
      state.in_progress_filter = filter;
    },

    clear_in_progress_filter(state){
      state.in_progress_filter = {};
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

    rm_socket_message_cb(state, cb){
      const index = state.callbacks.socket_msg.indexOf(cb);
      if(index == -1) return;

      state.callbacks.socket_msg.splice(index, 1);
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
