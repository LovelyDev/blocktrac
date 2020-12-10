<!--
  * AccountMerge Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    AccountMerge
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

export default {
  name : 'AccountMerge',

  mixins : [Meta],

  components : {
    XLMTxContainer,
  },

  computed : {
  }
}
</script>

<style scoped>
</style>
