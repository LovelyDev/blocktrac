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
  return config.network_id() == 'xrp';
}

function is_xlm(){
  return config.network_id() == 'xlm';
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

    network_jsonpath_examples : function(){
      if(is_xrp())
        return [{
          id : "payments_gt_500xrp",
          expression : "$.transaction[?(parseInt(@.Amount) > 500000000)]",
          desc : "Filter out payments < 500M Drops (500 XRP)"

        }, {
          id : "no_offercreates",
          expression : "$.transaction[?(@.TransactionType && @.TransactionType != 'OfferCreate')]",
          desc : "Filter out OfferCreate Transactions"

        }, {
          id : "only_success",
          expression : "$.transaction[?(@.TransactionResult == 'tesSUCCESS')]",
          desc : "Filter Transactions by specific result type"

        }, {
          id : "create_new_accounts",
          expression : "$.transaction.meta.AffectedNodes[?(@.CreatedNode.LedgerEntryType == 'AccountRoot')]",
          desc : "View transactions which create new accounts"
        }];

      if(is_xlm())
        return [{
          id : "payments_gt_500xlm",
          expression : "$..[?(@.paymentOp.asset._type == 'assetTypeNative' && parseInt(@.paymentOp.amount) > 5000000000)]",
          desc : "Filter out payments < 5B STROOPS (500 XLM)"

        }, {
          id : "no_offers",
          expression : "$..[?(@.body._type != 'manageBuyOffer' && @.body._type != 'manageSellOffer')]",
          desc : "Filter out offers"

        }, {
          id : "only_success",
          expression : "$..[?(@.result._type == 'txSuccess')]",
          desc : "Filter Transactions by specific result type"

        }, {
          id : "create_new_accounts",
          expression : "$..createAccountOp",
          desc : "View transactions which create new accounts"
        }];

      return [];
    },

    // XXX: Also set in MainTitle component and affects favicon
    app_name : function() {
      return is_xrp() ? 'Zerp Tracker' :
             is_xlm() ? 'Stracker'     :
                                    '' ;
    }
  }
}
