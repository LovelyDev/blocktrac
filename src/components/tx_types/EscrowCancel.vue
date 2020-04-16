<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>

      <AccountLink :account="account" />
    </div>

    <div class="amount_sequence_pad"></div>

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
import TxContainer  from '../TxContainer.vue'
import AccountLink  from '../AccountLink.vue'
import CurrencyIcon from '../CurrencyIcon.vue'

import config        from '../../config'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'EscrowCancelTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountLink,
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
.account{
  flex-basis: 42%;
  font-size: 0.8rem;
}

.amount_sequence_pad{
  flex-basis: 15%;
}

.amount{
  flex-basis: 21%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.sequence{
  flex-basis: 21%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
