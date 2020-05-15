<template>
  <span class="account_link">
    <a :href="href">{{text}}</a>
  </span>
</template>

<script>
import config from '../config'

export default {
  name: 'AccountLink',

  props : {
    account : String,
    shorten : Boolean,
  },

  computed : {
    href : function(){
      return "/account/" + this.account;
    },

    text : function(){
      if(this.shorten)
        return this.account.substr(0, 7) + "...";
      return this.account;
    },
  }
}
</script>

<style scoped>
.account_link{
  font-size: 0.60rem;
}
</style>
