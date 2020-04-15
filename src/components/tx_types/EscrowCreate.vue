<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>
      <AccountLink :account="account" />
    </div>

    <div class="currency_amount">
      <CurrencyAmount :amount="amount" />
    </div>

    <div class="tx_pad"></div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import AccountLink    from '../AccountLink.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'EscrowCreateTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountLink,
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
.account{
  font-size: 0.8rem;
  flex-basis: 32%;
}

.currency_amount{
  flex-basis: 46%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
}
</style>
