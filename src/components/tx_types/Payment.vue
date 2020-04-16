<template>
  <TxContainer :tx="tx">
    <div class="destination">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Destination</span>
      </div>

      <AccountLink :account="dst" />
    </div>

    <div class="currency_amount">
      <CurrencyAmount :amount="amount" no_issuer />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'
import AccountLink    from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'PaymentTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount,
    AccountLink
  },

  computed : {
    dst : function(){
      return this.tx_obj["Destination"];
    },

    amount : function(){
      return this.tx_obj["Amount"];
    }
  }
}
</script>

<style scoped>
.destination{
  flex-basis: 32%;
  font-size: 0.8rem;
}

.currency_amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
