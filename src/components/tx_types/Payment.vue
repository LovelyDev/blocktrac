<template>
  <TxContainer :tx="tx">
    <AccountDetail :account="dst" text="Destination" />

    <div class="currency_amount">
      <CurrencyAmount :amount="amount" no_issuer />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer'
import CurrencyAmount from '../CurrencyAmount'
import AccountDetail  from '../AccountDetail'
import HasTx          from '../../mixins/has_tx'

export default {
  name   : 'PaymentTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount,
    AccountDetail
  },

  computed : {
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
.currency_amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
