<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>

      <AccountLink :account="account" />
    </div>

    <div class="buy_amount">
      <div class="tx_detail_label">Buying</div>
      <CurrencyAmount :amount="pays" no_issuer />
    </div>

    <div class="sell_amount">
      <div class="tx_detail_label">Selling</div>

      <CurrencyAmount :amount="gets" no_issuer />
    </div>

    <div class="tx_pad"></div>
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
  flex-basis: 42%;
  font-size: 0.8rem;
}

.buy_amount,
.sell_amount{
  flex-basis: 18%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
