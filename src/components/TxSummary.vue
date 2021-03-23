<!--
  * Tx Summary Component
  * Dispatches to Blockchain Specific Tx Summary Component
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <XRPTxSummary :tx="tx" v-if="is_xrp" />
    <XLMTxSummary :tx="tx" v-if="is_xlm" />
  </div>
</template>

<script>
import XRPTxSummary from './tx_summaries/XRP'
import XLMTxSummary from './tx_summaries/XLM'

import Blockchain   from '../mixins/blockchain'

export default {
  name: 'TxSummary',

  mixins : [Blockchain],

  components : {
    XRPTxSummary,
    XLMTxSummary
  },

  props : {
    tx : {
      type : Object,
      required : true
    }
  },
}
</script>
