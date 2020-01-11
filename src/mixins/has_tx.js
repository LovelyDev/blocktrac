module.exports = {
  props : {
    tx : Object
  },

  computed : {
    tx_obj : function(){
      return this.tx["transaction"] || this.tx["tx"];
    },

    tx_meta : function(){
      return this.tx["meta"];
    }
  }
}
