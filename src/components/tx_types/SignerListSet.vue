<template>
  <span>
    {{num}} signers
  </span>
</template>

<script>
var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'SignerListSetTx',

  mixins : [HasTx],

  computed : {
    num : function(){
      return this.tx_obj["SignerEntries"].length;
    }
  }
}
</script>
