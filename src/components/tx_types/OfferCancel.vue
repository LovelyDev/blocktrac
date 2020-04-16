<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>

      <AccountLink :account="account" />
    </div>

    <template v-if="has_offer">
      <div class="buy_amount">
        <div class="tx_detail_label">Buying</div>
        <CurrencyAmount :amount="pays" no_issuer />,
      </div>

      <div class="sell_amount">
        <div class="tx_detail_label">Selling</div>

        <CurrencyAmount :amount="gets" no_issuer />
      </div>
    </template>

    <template v-else>
      <div class="sequence_pad"></div>

      <div class="sequence">
        <div class="tx_detail_label">Sequence</div>
        <div>{{sequence}}</div>
      </div>
    </template>

    <div class="tx_pad"></div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'
import AccountLink    from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx').default
export default {
  name   : 'OfferCancelTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount,
    AccountLink
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
.account{
  flex-basis: 42%;
  font-size: 0.8rem;
}

.buy_amount,
.sell_amount{
  flex-basis: 18%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sequence_pad{
  flex-basis: 15%;
}

.sequence{
  flex-basis: 21%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
