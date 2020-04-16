<template>
  <TxContainer :tx="tx">
    <AccountDetail :account="issuer" text="Issuer" />

    <div class="currency_amount">
      <CurrencyAmount :amount="limit_amount" no_issuer  v-if="!revoked" />
      <span style="color: red" v-else>Revoked</span>
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import AccountDetail  from '../AccountDetail.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'TrustSetTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountDetail,
    CurrencyAmount
  },

  computed : {
    limit_amount : function(){
      return this.tx_obj["LimitAmount"];
    },

    issuer : function(){
      return this.limit_amount["issuer"];
    },

    value : function(){
      return this.limit_amount["value"];
    },

    currency : function(){
      return this.limit_amount["currency"];
    },

    revoked : function(){
      return this.value == "0";
    }
  }
}
</script>

<style scoped>
.currency_amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
