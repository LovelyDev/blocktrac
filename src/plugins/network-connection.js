// Blockchain Network Connection operations

import xrp from './network-connection/xrp'
import xlm from './network-connection/xlm'

const modules = {
  xrp : xrp,
  xlm : xlm
};

///

export default {
  install(Vue, options) {
    // Network variables
    Vue.prototype.network = {
      connected : false,
      callbacks : {
        connected    : [],
        disconnected : []
      }
    };

    // Internal helper, return module for active blockchain
    Vue.prototype.network._module = function(){
      return modules[this.vue.active_blockchain];
    }

    // Internal helper, wrap transaction in similar manner
    // as ziti/workers/run_filters_workers
    Vue.prototype.network._wrap_tx = function(tx){
      return {transaction : tx};
    }

    // Internal helper, invoke connected callbacks
    Vue.prototype.network._call_connected_callbacks = function(){
      // Iterate over copy of callbacks array
      this.callbacks.connected.slice().forEach(function(cb){
        cb()
      });
    }

    // Internal helper, invoke disconnected callbacks
    Vue.prototype.network._call_disconnected_callbacks = function(){
      // Iterate over copy of callbacks array
      this.callbacks.disconnected.slice().forEach(function(cb){
        cb();
      });
    }

    ///

    // Initialize module
    Vue.prototype.network_init = function(){
      this.network.vue = this;
      this.network._module().init.bind(this.network)();
    }

    // Connect to blockchain network
    Vue.prototype.network.connect = function(){
      this._module().connect.bind(this)();
    }

    // Connected accessor
    Vue.prototype.network.is_connected = function(){
      return this.connected;
    }

    // Register connection callback, invoke immediate if already connected
    Vue.prototype.network.on_connection = function(cb){
      this.callbacks.connected.push(cb);

      if(this.connected) cb();
    }

    // Remove specified connection callback
    Vue.prototype.network.off_connection = function(cb){
      const index =  this.callbacks.connected.indexOf(cb)
      if(index > -1) this.callbacks.connected.splice(index, 1)
    }

    // Register disconnection callback, invoke immediate if already connected
    Vue.prototype.network.on_disconnection = function(cb){
      this.callbacks.disconnected.push(cb);

      if(!this.connected) cb();
    }

    // Remove specified disconnection callback
    Vue.prototype.network.off_disconnection = function(cb){
      const index =  this.callbacks.disconnected.indexOf(cb)
      if(index > -1) this.callbacks.disconnected.splice(index, 1)
    }

    ///

    // Validate network address
    Vue.prototype.network.is_valid_address = function(id){
      return this._module().validate_address.bind(this)(id);
    }

    // Retrieve account specified id, invoking callback w/ result
    Vue.prototype.network.account = function(id, cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().retrieve_account.bind(this)(id, cb);
      }.bind(this)

      this.on_connection(connection_cb);
    }

    // Retrieve transaction specified id, invoking callback w/ result
    Vue.prototype.network.tx = function(id, cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().retrieve_tx.bind(this)(id, cb);
      }.bind(this);

      this.on_connection(connection_cb)
    }

    // Stream transactions
    Vue.prototype.network.stream_txs = function(cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().stream_txs.bind(this)(cb);
      }.bind(this)

      this.on_connection(connection_cb)
    }

    // Stop streaming transactions
    Vue.prototype.network.stop_streaming_txs = function(){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().stop_streaming_txs.bind(this)();
      }.bind(this)

      this.on_connection(connection_cb)
    }
  }
}
