<template>
  <div>
    Released Escrow {{seq}}
  </div>
</template>

<script>
var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'EscrowFinishTx',

  mixins : [HasTx],

  computed : {
    seq : function(){
      return this.tx_obj["OfferSequence"];
    }
  }
}
</script>
