<template>
  <TxContainer :tx="tx">
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
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer'
import CurrencyAmount from '../CurrencyAmount'
import HasTx          from '../../mixins/has_tx'

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
