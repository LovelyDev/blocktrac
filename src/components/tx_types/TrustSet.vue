<template>
  <div>
    <AccountLink v-bind:account="account" />
    <span :style="{color: color}">[{{msg}}]</span>
    <LimitAmount v-bind:amount="limit_amount" />
  </div>
</template>

<script>
import AccountLink from '../AccountLink.vue'
import LimitAmount from '../LimitAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'TrustSetTx',

  mixins : [HasTx],

  components : {
    AccountLink,
    LimitAmount
  },

  computed : {
    account : function(){
      return this.tx_obj["Account"];
    },

    limit_amount : function(){
      return this.tx_obj["LimitAmount"];
    },

    msg : function(){
      return this.limit_amount.value == 0 ? 'revoked trust' : 'extended trust';
    },

    color : function(){
      return this.limit_amount.value == 0 ? 'red' : 'green';
    }
  }
}
</script>
