<template>
  <TxContainer :tx="tx">
    <div class="buy_amount">
      <div class="tx_detail_label">Buying</div>
      <CurrencyAmount :amount="pays" no_issuer />
    </div>

    <div class="sell_amount">
      <div class="tx_detail_label">Selling</div>

      <CurrencyAmount :amount="gets" no_issuer />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'OfferCreateTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount
  },

  computed : {
    offer : function(){
      // need to pull fields from tx_obj for failed OfferCreates
      return this.created_fields('Offer') || this.tx_obj;
    },

    gets : function(){
      return this.offer["TakerGets"];
    },

    pays : function(){
      return this.offer["TakerPays"];
    }
  }
}
</script>

<style scoped>
.buy_amount,
.sell_amount{
  flex-basis: 23%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
