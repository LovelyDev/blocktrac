<template>
  <TxContainer :tx="tx">
    <div class="from_account">
      <div>
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>from account</span>
      </div>

      <AccountLink :account="src" />
    </div>

    <div class="to_account">
      <div>
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>to account</span>
      </div>

      <AccountLink :account="dst" />
    </div>

    <div class="amount_currency">
      <CurrencyAmount :amount="amount" />
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
    src : function(){
      return this.tx_obj["Account"];
    },

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
.from_account,
.to_account{
  flex-basis: 32%;
  font-size: 0.8rem;
}

.amount_currency{
  flex-basis: 13%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
}
</style>
