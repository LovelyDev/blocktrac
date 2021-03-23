/*
 * Blockchain mixin providing helper methods pertaining to
 * blockchain selection and config
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import network_config from '../network-config'

export default {
  computed : {
    configured_network : function(){
      return network_config.NETWORK;
    },

    no_network_configured : function(){
      return !this.configured_network;
    },

    // XXX: depends on blockchain mixin
    active_network : function(){
      return this.no_network_configured ?
             network_config.DEFAULT_NETWORKS[this.active_blockchain] :
             this.configured_network;
    },

    active_network_uri : function(){
      return network_config.NETWORK_URIS[this.active_network];
    }
  }
}
