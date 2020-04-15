<template>
  <span>
    Cancelled Escrow
    
    <CurrencyAmount :amount="amount"
                       v-if="has_amount"/>

    <div v-else>
      {{sequence}}
    </div>
  </span>
</template>

<script>
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'EscrowCancelTx',

  mixins : [HasTx],

  components : {
    CurrencyAmount
  },

  computed : {
    amount : function(){
      return this.tx_obj["Amount"];
    },

    has_amount : function(){
      return !!this.amount;
    },

    sequence : function(){
      return this.tx_obj["OfferSequence"];
    }
  }
}
</script>
