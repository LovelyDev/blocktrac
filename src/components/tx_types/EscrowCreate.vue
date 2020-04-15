<template>
  <TxContainer :tx="tx">
    <div class="currency_amount">
      <CurrencyAmount :amount="amount" />
    </div>

    <div class="currency_amount_pad"></div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'EscrowCreateTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount
  },

  computed : {
    amount : function(){
      return this.tx_obj["Amount"];
    }
  }
}
</script>

<style scoped>
.currency_amount{
  flex-basis: 77%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
}

.currency_amount_pad{
  flex-basis: 3%;
}
</style>
