<!--
  * Account Link Component
  * Renders link to account page
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span class="account_link"
        @click="nav_to_account">
    {{text}}
  </span>
</template>

<script>
import config from '../config/config'

export default {
  name: 'AccountLink',

  props : {
    account : String,
    shorten : [Boolean, Number],
  },

  computed : {
    text : function(){
      if(this.shorten){
        if(Number.isInteger(this.shorten))
          return this.account.substr(0, this.shorten) + "...";

        else
          return this.account.substr(0, 7) + "...";
      }
      return this.account;
    },
  },

  methods : {
    nav_to_account : function(){
      this.$router.push("/account/" + this.account);
    }
  }
}
</script>

<style scoped>
.account_link{
  font-size: 0.60rem;
  cursor: pointer;
  color: var(--theme-color1);
}
</style>
