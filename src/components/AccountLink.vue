<template>
  <span>
    <a :href="href">{{account}}</a>
  </span>
</template>

<script>
import config from '../config'

export default {
  name: 'AccountLink',

  props : {
    account    : String
  },

  computed : {
    href : function(){
      return config.XRP1NTEL_URL + "/account/" + this.account;
    }
  }
}
</script>
