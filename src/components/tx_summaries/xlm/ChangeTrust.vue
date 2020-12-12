<!--
  * ChangeTrust Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="issuer"
                   text="Issuer" />

    <XLMCurrencyAmount :currency="asset"
                       :amount="limit"
                       no_issuer />
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import AccountDetail  from '../../AccountDetail'
import XLMCurrencyAmount from '../../currency_amount/XLM'

import config from '../../../config'

export default {
  name : 'ChangeTrustTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    AccountDetail,
    XLMCurrencyAmount
  },

  computed : {
    op : function(){
      return this.operation.changeTrustOp;
    },

    alpha_num : function(){
      return this.op.line.alphaNum4 ||
             this.op.line.alphaNum12;
    },

    asset : function(){
      return this.alpha_num.assetCode;
    },

    issuer : function(){
      return this.alpha_num.issuer.ed25519;
    },

    limit : function(){
      return parseInt(this.op.limit) / config.STROOPS_PER_XLM;
    }
  }
}
</script>

<style scoped>
</style>
