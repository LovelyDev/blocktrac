export default {
  props : {
    blockchain: String
  },

  methods : {
    persist_blockchain : function(){
      if(this.blockchain)
        this.$store.commit('set_selected_blockchain', this.blockchain);
    }
  }
}
