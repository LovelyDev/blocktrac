<template>
  <TxContainer :tx="tx">
    <div class="issuer">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Issuer</span>
      </div>
      <AccountLink :account="issuer" />
    </div>

    <div class="currency_amount">
      <CurrencyAmount :amount="limit_amount" no_issuer  v-if="!revoked" />
      <span style="color: red" v-else>Revoked</span>
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import AccountLink    from '../AccountLink.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'TrustSetTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountLink,
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
.issuer{
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
