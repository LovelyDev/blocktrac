<template>
  <TxContainer :tx="tx">
    <div class="destination">
      <template v-if="destination">
        <div class="tx_detail_label">
          <img src="../../assets/person-icon.png" />&nbsp;
          <span>Destination</span>
        </div>

        <AccountLink :account="destination" />
      </template>
    </div>

    <div class="amount">
      <CurrencyAmount :amount="amount" />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import AccountLink    from '../AccountLink.vue'
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'PaymentChannelFundTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountLink,
    CurrencyAmount
  },

  computed : {
    paychan : function(){
      return this.modified_fields("PayChannel");
    },

    amount : function(){
      return this.tx_obj["Amount"];
    },

    destination : function(){
      if(!this.paychan) return null

      return this.paychan["Destination"];
    }
  }
}
</script>

<style scoped>
.destination{
  flex-basis: 32%;
  font-size: 0.8rem;
}

.amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
