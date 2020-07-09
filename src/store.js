/*
 * Application store of shared data
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */
import Vue  from 'vue'
import Vuex from 'vuex'

import config from './config'
import util   from './util'

var jsonpath = require('./vendor/jsonpath')

Vue.use(Vuex)

jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

export const store = new Vuex.Store({
  state : {
    // Logged in user
    user : {
      email : '',
      membership_level : '',
      profile : '',
      renewal_date : '',
      has_credit_card : false,
      additional_filters : 0,
      additional_sinks : 0,
      privileges : []
    },

    // Data pertaining to TxsList
            txs : [],
    loading_txs : true,
     paused_txs : false,
      tx_filter : '',

    // Categories used to filter the TxsList
          tx_categories : [],
    tx_category_tallies : config.TX_CATEGORIES
                                .reduce(function(tallies, category, i){
                            tallies[category] = 0;
                            return tallies;
                          }, {}),

    // Constructs retrieved via the Ziti Server API
           templates : [],
               sinks : [],
             filters : [],
      filter_matches : [],
       notifications : [],

    active_filter : {},
    in_progress_filter : {},

    // Callbacks registered on various socket-related events
    callbacks : {
      socket_open : [],
      socket_msg  : [],
         commands : {}
    },

    // Socket status variables
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },

  mutations: {
    // set logged in user
    set_user(state, user) {
      state.user.email = user.email;
      state.user.membership_level = user.membership_level;
      state.user.profile = user.profile;
      state.user.renewal_date = user.renewal_date;
      state.user.has_credit_card = user.has_credit_card;
      state.user.additional_filters = user.additional_filters;
      state.user.additional_sinks = user.additional_sinks;
      state.user.privileges = user.Privileges;
    },

    // clear logged in user
    clear_user(state) {
      state.user.email = ''
      state.user.membership_level = '';
      state.user.profile = '';
      state.user.has_credit_card = false;
      state.user.renewal_date = '';
      state.user.additional_filters = 0;
      state.user.additional_sinks = 0;
      state.user.privileges = [];
    },

    // Enable/disable live transaction stream
    toggle_paused_txs(state){
      state.paused_txs = !state.paused_txs;
    },

    // Called when JSONPath expression filter is updated in UI
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

    // Store a tx which was received from rippled server
    add_tx(state, tx){
      if(state.paused_txs) return;

      const wrapped = { transaction : tx }

      if(state.tx_filter)
        if(jsonpath.query(wrapped, state.tx_filter).length == 0)
          return;

      var category = config.tx_category_for_type(wrapped["transaction"]["transaction"]["TransactionType"]);
      if(state.tx_categories.length != 0 &&
        !state.tx_categories.includes(category))
        return;

      state.loading_txs = false;

      // making message reactive slows down perf
      Object.freeze(wrapped);

      // Add to txs list and cap number
      state.txs.unshift(wrapped);
      state.txs.splice(config.TX_HISTORY, state.txs.length - config.TX_HISTORY);

      // Update tallies
      state.tx_category_tallies['ALL']    += 1;
      state.tx_category_tallies[category] += 1;
    },

    // Reset tx categories to initial state
    clear_tx_categories(state, category){
      state.tx_categories = [];
    },

    // Enable / disable a specific tx category
    toggle_tx_category(state, category){
      // Toggle category selection
      if(state.tx_categories.includes(category)){
        const index = state.tx_categories.indexOf(category);
        state.tx_categories.splice(index, 1);

      }else
        state.tx_categories.push(category);

      // Filter txs by category
      state.txs = state.txs.filter(function(tx){
        var category = config.tx_category_for_type(tx["transaction"]["transaction"]["TransactionType"]);
        return(state.tx_categories.length == 0 ||
               state.tx_categories.includes(category))
      })
    },

    // Clear all local transactions
    clear_txs(state, filter){
      state.txs = [];
    },

    ///

    // Store templates retrieved from server
    set_templates(state, templates){
      state.templates = templates;
    },

    // Store sinks retrieved from server
    set_sinks(state, sinks){
      state.sinks = sinks;
    },

    // Store filters retrieved from server
    set_filters(state, filters){
      state.filters = filters;
    },

    // Store filter matches retrieved from server
    set_filter_matches(state, filter_matches){
      state.filter_matches = filter_matches;
    },

    // Store notifications retrieved from server
    set_notifications(state, notifications){
      state.notifications = notifications
    },

    // Set the active filter which the user is interacting with
    set_active_filter(state, filter){
      state.active_filter = filter;
    },

    // Store filter user is creating temporarily until
    // registration/login is finished
    set_in_progress_filter(state, filter){
      state.in_progress_filter = filter;
    },

    // Clear the in progress filter
    clear_in_progress_filter(state){
      state.in_progress_filter = {};
    },

    ///

    // Rippled websocket related callbacks

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
