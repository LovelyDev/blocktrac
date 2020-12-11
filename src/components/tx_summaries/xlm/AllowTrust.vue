<!--
  * AllowTrust Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="trustor"
                   text="Trustor" />

    <XLMCurrencyAmount :currency="asset"
                       no_issuer />
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import AccountDetail  from '../../AccountDetail'
import XLMCurrencyAmount from '../../currency_amount/XLM'

export default {
  name : 'AllowTrust',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    AccountDetail,
    XLMCurrencyAmount
  },

  computed : {
    op : function(){
      return this.operation.allowTrustOp;
    },

    asset : function(){
      return this.op.asset.assetCode12;
    },

    trustor : function(){
      return this.op.trustor.ed25519;
    }
  }
}
</script>

<style scoped>
</style>
