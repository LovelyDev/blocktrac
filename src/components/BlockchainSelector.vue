<!--
  * Blockchain Selector
  * Allows user to select the active blockchain to view on the website.
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <multiselect v-model="selected"
               :options="blockchains"
               :allow-empty="false"
               :multiple="false"
               :searchable="false"
               selectLabel=""
               deselectLabel="">
    <template slot="singleLabel" slot-scope="props">
      <CurrencyIcon :currency="props.option.toUpperCase()" />
      {{props.option.toUpperCase()}}
    </template>

    <template slot="option" slot-scope="props">
      <CurrencyIcon :currency="props.option.toUpperCase()" />
      {{props.option.toUpperCase()}}
    </template>
  </multiselect>
</template>

<script>
import CurrencyIcon    from '../components/CurrencyIcon'
import config          from '../config/config'
import network_config  from '../config/network'
import MultiBlockchain from '../mixins/multi_blockchain'

export default {
  name: 'BlockchainSelector',

  mixins : [
    MultiBlockchain
  ],

  components : {
    CurrencyIcon
  },

  computed : {
    blockchains : function(){
      return network_config.BLOCKCHAINS;
    },

    selected : {
      get : function(){
        return this.$store.state.selected_blockchain;
      },

      set : function(selected){
        this.$store.commit('set_selected_blockchain', selected);
      }
   }
  },

  created : function(){
    this.persist_blockchain();
  }
}
</script>

<style scoped>
.multiselect{
  width: unset;
  margin-left: 10px;
}
</style>
