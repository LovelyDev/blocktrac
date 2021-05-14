/*
 * MultiBlockchain mixin providing ability to switch between
 * blockchains / setactive blockchain
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

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
