<template>
  <div>
    Offer to buy <CurrencyAmount :amount="pays" />,
    Selling <CurrencyAmount :amount="gets" />
  </div>
</template>

<script>
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'OfferCreateTx',

  mixins : [HasTx],

  components : {
    CurrencyAmount
  },

  computed : {
    gets : function(){
      return this.tx_obj["TakerGets"];
    },

    pays : function(){
      return this.tx_obj["TakerPays"];
    }
  }
}
</script>
