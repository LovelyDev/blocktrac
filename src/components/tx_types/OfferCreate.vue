<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div>Account</div>
      <AccountLink :account="account" />
    </div>

    <div class="buy_amount">
      <div>Buying</div>
      <CurrencyAmount :amount="pays" />,
    </div>

    <div class="sell_amount">
      <div>Selling</div>

      <CurrencyAmount :amount="gets" />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'
import AccountLink    from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'OfferCreateTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount,
    AccountLink
  },

  computed : {
    account : function(){
      return this.tx_obj["Account"];
    },

    gets : function(){
      return this.tx_obj["TakerGets"];
    },

    pays : function(){
      return this.tx_obj["TakerPays"];
    }
  }
}
</script>

<style scoped>
.account{
  flex-basis: 45%;
  font-size: 0.8rem;
}

.buy_amount,
.sell_amount{
  flex-basis: 16%;
  font-size: 0.8rem;
}
</style>
