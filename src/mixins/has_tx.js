import util   from '../util'
import config from '../config'

export default {
  props : {
    tx : {
      type : Object,
      required : true
    }
  },

  computed : {
    tx_obj : function(){
      return this.tx["transaction"] || this.tx["tx"];
    },

    tx_meta : function(){
      return this.tx["meta"];
    },

    affected_nodes : function(){
      return this.tx_meta["AffectedNodes"];
    },

    tx_type : function(){
      return this.tx_obj["TransactionType"];
    },

    tx_short_type : function(){
      return this.tx_obj["TransactionType"].replace("PaymentChannel", "PayChan");
    },

    account : function(){
      return this.tx_obj["Account"];
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
  },

  methods : {
    created_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['CreatedNode'] &&
                      node['CreatedNode']['LedgerEntryType'] == type;
             });
    },

    created_node : function(type){
      const node = this.created_nodes(type)[0];
      if(!node) return null;

      return node['CreatedNode']
    },

    created_fields : function(type){
      const node = this.created_node(type);
      if(!node) return null;

      return node['NewFields'];
    },

    ///

    modified_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['ModifiedNode'] &&
                      node['ModifiedNode']['LedgerEntryType'] == type;
             });
    },

    modified_node : function(type){
      const node = this.modified_nodes(type)[0];
      if(!node) return null;

      return node['ModifiedNode']
    },

    modified_fields : function(type){
      const node = this.modified_node(type);
      if(!node) return null;

      return node['FinalFields'];
    },

    ///

    deleted_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['DeletedNode'] &&
                      node['DeletedNode']['LedgerEntryType'] == type;
             });
    },

    deleted_node : function(type){
      const node = this.deleted_nodes(type)[0];
      if(!node) return null;

      return node['DeletedNode']
    },

    deleted_fields : function(type){
      const node = this.deleted_node(type);
      if(!node) return null;

      return node['FinalFields'];
    }
  }
}
