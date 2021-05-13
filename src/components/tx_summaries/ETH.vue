<!--
  * ETH Tx Summary Component
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="eth_tx_summary" :title="title">
    ETH TODO
  </div>
</template>

<script>
import Meta from './eth/meta'

export default {
  name: 'ETHTxSummary',

  mixins : [Meta],

  computed : {
    title : function(){
      return 'TODO';
    }
  }
}
</script>
