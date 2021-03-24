<!--
  * Blockchain Selector
  * Allows user to select the active blockchain to view on the website.
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-form-select v-model="selected">
    <b-form-select-option v-for="blockchain in blockchains"
                          :key="blockchain"
                          :value="blockchain">
      {{blockchain}}
    </b-form-select-option>
  </b-form-select>
</template>

<script>
import config         from '../config/config'
import network_config from '../config/network'

export default {
  name: 'BlockchainSelector',

  data : function(){
    return {
      selected : network_config.DEFAULT_BLOCKCHAIN
    }
  },

  computed : {
    blockchains : function(){
      return network_config.BLOCKCHAINS;
    }
  },

  watch : {
    selected : function(){
      this.$store.commit('set_selected_blockchain', this.selected);
    }
  }
}
</script>

<style scoped>
select{
  width: unset;
  margin-left: 10px;
}
</style>
