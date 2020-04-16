<template>
  <TxContainer :tx="tx">
    <div class="domain" v-if="domain">
      <div class="tx_detail_label">Domain</div>
      <div>{{domain}}</div>
    </div>
  </TxContainer>
</template>

<script>
import TxContainer from '../TxContainer.vue'

import util from '../../util'

var HasTx = require('../../mixins/has_tx').default

// TODO: also SetFlag, ClearFlag, EmailHash, MessageKey, TransferRate, TickSize

export default {
  name   : 'AccountSet',

  mixins : [HasTx],

  components : {
    TxContainer
  },

  computed : {
    domain : function(){
      if(!this.tx_obj.Domain) return null;

      const decoded = util.hex_to_ascii(this.tx_obj.Domain);
      if(decoded.length < 15) return decoded;

      return decoded.substr(0, 15) + "...";
    }
  }
}
</script>

<style scoped>
.domain{
  flex-basis: 12%;
  font-size: 0.8rem;
}
</style>
