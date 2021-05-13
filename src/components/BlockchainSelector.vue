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
import CurrencyIcon   from '../components/CurrencyIcon'
import config         from '../config/config'
import network_config from '../config/network'

export default {
  name: 'BlockchainSelector',

  components : {
    CurrencyIcon
  },

  data : function(){
    return {
      selected : null
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
  },

  created : function(){
    this.selected = this.$store.state.selected_blockchain;
  }
}
</script>

<style scoped>
.multiselect{
  width: unset;
  margin-left: 10px;
}
</style>
