<template>
  <div>
    Payment of
    <CurrencyAmount :amount="amount" />
    from <AccountLink :account="src" />
    to <AccountLink :account="dst" />
  </div>
</template>

<script>
import CurrencyAmount from '../CurrencyAmount.vue'
import AccountLink    from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'PaymentTx',

  mixins : [HasTx],

  components : {
    CurrencyAmount,
    AccountLink
  },

  computed : {
    src : function(){
      return this.tx_obj["Account"];
    },

    dst : function(){
      return this.tx_obj["Destination"];
    },

    amount : function(){
      return this.tx_obj["Amount"];
    }
  }
}
</script>
