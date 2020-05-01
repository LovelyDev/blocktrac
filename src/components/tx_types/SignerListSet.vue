<template>
  <TxContainer :tx="tx">
    <div class="signers">
      <div class="tx_detail_label">Signers</div>
      <span>{{num}}</span>
    </div>

    <div class="quorum">
      <div class="tx_detail_label">Quorum</div>
      <span>{{quorum}}</span>
    </div>
  </TxContainer>
</template>

<script>
import TxContainer from '../TxContainer'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'SignerListSetTx',

  mixins : [HasTx],

  components : {
    TxContainer
  },

  computed : {
    num : function(){
      return this.tx_obj["SignerEntries"].length;
    },

    quorum : function(){
      return this.tx_obj["SignerQuorum"];
    }
  }
}
</script>

<style scoped>
.signers,
.quorum{
  flex-basis: 23%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
