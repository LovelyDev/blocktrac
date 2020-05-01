<template>
  <TxContainer :tx="tx">
    <template v-if="has_offer">
      <div class="buy_amount">
        <div class="tx_detail_label">Buying</div>

        <span class="currency_amount">
          <CurrencyAmount :amount="pays" no_issuer />
        </span>
      </div>

      <div class="sell_amount">
        <div class="tx_detail_label">Selling</div>

        <span class="currency_amount">
          <CurrencyAmount :amount="gets" no_issuer />
        </span>
      </div>
    </template>

    <template v-else>
      <div class="sequence">
        <div class="tx_detail_label">Sequence</div>
        <div>{{sequence}}</div>
      </div>
    </template>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer'
import CurrencyAmount from '../CurrencyAmount'

var HasTx = require('../../mixins/has_tx').default
export default {
  name   : 'OfferCancelTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount
  },

  computed : {
    sequence : function(){
      return this.tx_obj["OfferSequence"];
    },

    offer : function(){
      return this.deleted_fields('Offer');
    },
 
    has_offer : function(){
      return !!this.offer;
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

.sequence{
  flex-basis: 46%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
