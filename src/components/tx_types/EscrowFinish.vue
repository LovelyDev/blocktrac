<template>
  <TxContainer :tx="tx">
    <div class="amount" v-if="amount">
      <span>
        {{amount}}
        <CurrencyIcon currency="XRP" />
      </span>
    </div>

    <div class="sequence" v-else>
      <div class="tx_detail_label">Sequence</div>
      <div>{{sequence}}</div>
    </div>
  </TxContainer>
</template>

<script>
import TxContainer  from '../TxContainer'
import CurrencyIcon from '../CurrencyIcon'

import config        from '../../config'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'EscrowFinishTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyIcon
  },

  computed : {
    sequence : function(){
      return this.tx_obj["OfferSequence"];
    },

    escrow : function(){
      return this.deleted_fields('Escrow')
    },

    amount : function(){
      if(!this.escrow) return null;
      return parseFloat(this.escrow["Amount"]) / config.DROPS_PER_XRP;
    }
  }
}
</script>

<style scoped>
.amount{
  flex-basis: 46%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.sequence{
  flex-basis: 46%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
