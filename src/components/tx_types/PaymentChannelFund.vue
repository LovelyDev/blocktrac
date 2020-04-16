<template>
  <TxContainer :tx="tx">
    <AccountDetail :account="dst" text="Destination" />

    <div class="amount">
      <CurrencyAmount :amount="amount" />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import AccountDetail  from '../AccountDetail.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'PaymentChannelFundTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountDetail,
    CurrencyAmount
  },

  computed : {
    paychan : function(){
      return this.modified_fields("PayChannel");
    },

    amount : function(){
      return this.tx_obj["Amount"];
    },

    dst : function(){
      if(!this.paychan) return null

      return this.paychan["Destination"];
    }
  }
}
</script>

<style scoped>
.amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
