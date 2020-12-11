<!--
  * AccountMerge Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="destination"
                   text="Destination" />
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'
import AccountDetail  from '../../AccountDetail'

export default {
  name : 'AccountMerge',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    AccountDetail
  },

  computed : {
    destination : function(){
      return this.operation.destination.ed25519;
    }
  }
}
</script>

<style scoped>
</style>
