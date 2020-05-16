<!--
  * Account Delete Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="dst"
                   text="Destination" />

    <div v-if="delivered" class="currency_amount">
      <CurrencyAmount :amount="delivered" />
    </div>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer'
import AccountDetail  from '../AccountDetail'
import CurrencyAmount from '../CurrencyAmount'
import HasTx          from '../../mixins/has_tx'

export default {
  name   : 'AccountDeleteTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountDetail,
    CurrencyAmount,
  },

  computed : {
    dst : function(){
      return this.tx_obj["Destination"];
    },

    delivered : function(){
      return this.tx_meta["DeliveredAmount"]
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

#main_layout.sm .currency_amount,
#main_layout.xs .currency_amount{
  flex-basis: 78%;
}
</style>
