<template>
  <span>
    Created Escrow: <CurrencyAmount :amount="amount" />
  </span>
</template>

<script>
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'EscrowCreateTx',

  mixins : [HasTx],

  components : {
    CurrencyAmount
  },

  computed : {
    amount : function(){
      return this.tx_obj["Amount"];
    }
  }
}
</script>
