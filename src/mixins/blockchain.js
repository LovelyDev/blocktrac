/*
 * Blockchain mixin providing helper methods pertaining to
 * blockchain selection and config
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import network_config    from '../config/network'
import blockchain_assets from '../assets/blockchains'

export default {
  computed : {
    configured_blockchain : function(){
      return network_config.BLOCKCHAIN;
    },

    configured_blockchain_upper : function(){
      return network_config.BLOCKCHAIN.toUpperCase();
    },

    no_blockchain_configured : function(){
      return !this.configured_blockchain;
    },

    xrp_configured : function(){
      return this.configured_blockchain == 'xrp';
    },

    xlm_configured : function(){
      return this.configured_blockchain == 'xlm';
    },

    ///

    selected_blockchain : function(){
      return this.$store.state.selected_blockchain;
    },

    selected_blockchain_upper : function(){
      return this.selected_blockchain.toUpperCase();
    },

    xrp_selected : function(){
      return this.selected_blockchain == 'xrp';
    },

    xlm_selected : function(){
      return this.selected_blockchain == 'xlm';
    },

    ///

    active_blockchain : function(){
      return this.no_blockchain_configured ?
             this.selected_blockchain :
             this.configured_blockchain;
    },

    active_blockchain_upper : function(){
      return this.no_blockchain_configured ?
             this.selected_blockchain_upper :
             this.configured_blockchain_upper;
    },

    xrp_active : function(){
      return this.active_blockchain == 'xrp';
    },

    xlm_active : function(){
      return this.active_blockchain == 'xlm';
    },

    ///

    blockchain_icon : function(){
      return require('../assets/currencies/' + this.active_blockchain_upper + '.svg');
    },

    blockchain_jsonpath_examples : function(){
      return blockchain_assets.jsonpath_examples[this.active_blockchain];
    },

    blockchain_jsonpath_example : function(){
      return this.blockchain_jsonpath_examples[0];
    },

    app_name : function() {
      return network_config.APP_NAME;
    }
  }
}
