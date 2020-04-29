<template>
  <span>
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
      // TODO local account page (remove xrp1ntel reference from project)
      return config.XRP1NTEL_URL + "/account/" + this.account;
    },

    text : function(){
      if(this.shorten)
        return this.account.substr(0, 7) + "...";
      return this.account;
    },
  }
}
</script>
