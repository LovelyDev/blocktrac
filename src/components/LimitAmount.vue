<template>
  <span>
    <span>
      <AccountLink :account="issuer" />
      ({{value | round | delim}} <sup>{{currency}}</sup>)
    </span>
  </span>
</template>

<script>
import AccountLink from './AccountLink.vue'

export default {
  name: 'CurrencyAmount',

  props : {
    amount : Object
  },

  components : {
    AccountLink
  },

  computed : {
    issuer : function(){
      return this.amount["issuer"];
    },

    value : function(){
      return parseFloat(this.amount["value"]);
    },

    currency : function(){
      return this.amount["currency"];
    }
  }
}
</script>
