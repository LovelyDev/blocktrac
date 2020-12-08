/*
 * Network mixin providing helper methods pertaining to network
 * selection and config
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

import config  from '../config'

// XXX: define & use external helpers as this mixin's computed module
//      is used directly in the doc-vars and network-connection plugin
//      where 'this' properties are not available.

function is_xrp(){
  return config.NETWORK.substring(0, 3) == 'xrp';
}

function is_xlm(){
  return config.NETWORK.substring(0, 3) == 'xlm';
}

export default {
  computed : {
    is_xrp : function(){
      return is_xrp()
    },

    is_xlm : function(){
      return is_xlm()
    },

    network_id : function(){
      return is_xrp() ? 'xrp' :
             is_xlm() ? 'xlm' :
                           '' ;
    },

    network_upper : function(){
      return this.network_id.toUpperCase();
    },

    network_description : function(){
      return is_xrp() ? "XRP is a popular Blockchain technology being adopted by banks and financial institutions worldwide for cross border remittances." :
             is_xlm() ? "XLM is a popular Blockchain technology being adopted worldwide for equitable access to the global financial system." :
                        "";
    },

    network_moreinfo : function(){
      return is_xrp() ? {url : 'https://xrpl.org',         title : 'xrpl.org'   } :
             is_xlm() ? {url : 'https://www.stellar.org/', title : 'stellar.org'} :
                        {} ;
    },

    network_icon : function(){
      return require('../assets/currencies/' + this.network_upper + '.svg');
    },

    // XXX: Also set in MainTitle component and affects favicon
    app_name : function() {
      return is_xrp() ? 'Zerp Tracker' :
             is_xlm() ? 'Stracker'     :
                                    '' ;
    }
  }
}
