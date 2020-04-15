<template>
  <TxContainer :tx="tx">
    <div class="from_account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>from account</span>
      </div>

      <AccountLink :account="src" />
    </div>

    <div class="to_account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>to account</span>
      </div>

      <AccountLink :account="dst" />
    </div>

    <div class="currency_amount">
      <CurrencyAmount :amount="amount" no_issuer />
    </div>

    <div class="currency_amount_pad"></div>
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

.currency_amount{
  flex-basis: 10%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.currency_amount_pad{
  flex-basis: 3%;
}
</style>
