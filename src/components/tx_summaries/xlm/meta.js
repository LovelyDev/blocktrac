/*
 * Helper providing access to a local xlm transaction specifics as
 * a property param to the component including this mixin.
 *
 * Used by all components rendered for a single xlm transaction
 * including the tx_type summaries.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

var Inflector = require('inflector-js')

import config from '../../../config'

export default {
  props : {
    tx : {
      type : Object,
      required : true
    }
  },

  computed : {
    hash : function(){
      return this.tx.hash;
    },

    account : function(){
      return this.tx.source_account;
    },

    tx_result : function(){
      return this.tx.result.result._type;
    },

    success : function(){
      return this.tx_result == "txSuccess" ;
    },

    operations : function(){
      return this.tx
                 .envelope
                 .v1
                 .tx
                 .operations
                 .map(function(op){
                   return op.body;
                 });
    },

    operation_types : function(){
      return this.operations.map(function(op){
               return op._type;
             });
    },

    humanized_operation_types : function(){
      return this.operation_types
                 .map(function(op){
                   return Inflector.camel2words(Inflector.underscore(op))
                 })
    },

    first_operation : function(){
      return this.operations[0];
    },

    first_operation_type : function(){
      return this.operation_types[0];
    },

    // Proritize operation to highlight
    operation : function(){
      if(this.operation_types.includes("payment"))
        return this.first_operation_of_type("payment");

      else if(this.operation_types.includes("paymentPathStrictSend"))
        return this.first_operation_of_type("paymentPathStrictSend");

      else if(this.operation_types.includes("paymentPathStrictReceive"))
        return this.first_operation_of_type("paymentPathStrictReceive");

      else if(this.operation_types.includes("manageBuyOffer"))
        return this.first_operation_of_type("manageBuyOffer");

      else if(this.operation_types.includes("manageSellOffer"))
        return this.first_operation_of_type("manageSellOffer");

      else if(this.operation_types.includes("createPassiveSellOffer"))
        return this.first_operation_of_type("createPassiveSellOffer");

      else if(this.operation_types.includes("allowTrust"))
        return this.first_operation_of_type("allowTrust");

      else if(this.operation_types.includes("changeTrust"))
        return this.first_operation_of_type("changeTrust");

      return this.first_operation;
    },

    operation_type : function(){
      return this.operation._type;
    },

    short_operation_type : function(){
      if(this.operation_type.substring(0, 10) == "paymentPath")
        return "PaymentPath";

      else if(this.operation_type.substring(this.operation_type.substring.length - 5,
                                            this.operation_type.substring.length) == "Offer")
        return "Offer";

      return Inflector.camelize(this.operation_type);
    },

    multiple_operations : function(){
      return this.operations.length > 1;
    },

    tx_category : function(){
      return config.tx_category_for_type(this.operation_type);
    },

    created_at : function(){
      return Date.parse(this.tx.created_at);
    },

    formatted_date : function(){
      return this.$options.filters.moment(this.created_at, "YYYY-MM-DD HH:mm:ss");
    }
  },

  methods : {
    first_operation_of_type : function(type){
      return this.operations.find(function(op){
        return op._type == type;
      })
    }
  }
}