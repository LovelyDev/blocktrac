import util   from '../util'
import config from '../config'

export default {
  props : {
    tx : Object
  },

  computed : {
    tx_obj : function(){
      return this.tx["transaction"] || this.tx["tx"];
    },

    tx_meta : function(){
      return this.tx["meta"];
    },

    tx_type : function(){
      return this.tx_obj["TransactionType"];
    },

    tx_category : function(){
      return config.tx_category_for_type(this.tx_type);
    },

    tx_result : function(){
      return this.tx_meta["TransactionResult"];
    },

    success : function(){
      return this.tx_result == "tesSUCCESS" ;
    },

    unix_date : function(){
      if(typeof(this.tx_obj["date"]) == "string")
        return Date.parse(this.tx_obj["date"]);

      return util.ledger_time_to_unix(this.tx_obj["date"]);
    },

    formatted_date : function(){
      return this.$options.filters.moment(this.unix_date, "YYYY-MM-DD HH:mm:ss");
    }
  }
}
