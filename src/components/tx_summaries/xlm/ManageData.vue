<!--
  * ManageData Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    ManageData
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

export default {
  name : 'ManageDataTx',

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
