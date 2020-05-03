<template>
  <TxContainer :tx="tx">
    <template v-if="has_offer">
      <template v-if="mq_gte_md">
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

      <div v-else
           class="buy_sell_pair">
        <div class="tx_detail_label">Buying/Selling</div>

        <span class="currencies">
          <CurrencyAmount :amount="pays" no_amount no_issuer /> /
          <CurrencyAmount :amount="gets" no_amount no_issuer />
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
import HasTx          from '../../mixins/has_tx'

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

.buy_sell_pair{
  flex-basis: 78%;
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

#main_layout.sm .sequence,
#main_layout.xs .sequence{
  flex-basis: 78%;
}
</style>
