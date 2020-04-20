<template>
  <div class="tx_summary"
      :class="success ? 'success' : 'failed'"
      :title="title">
    <PaymentTx              :tx="tx"      v-if="tx_type == 'Payment'"              />
    <OfferCreateTx          :tx="tx" v-else-if="tx_type == 'OfferCreate'"          />
    <OfferCancelTx          :tx="tx" v-else-if="tx_type == 'OfferCancel'"          />
    <EscrowCreateTx         :tx="tx" v-else-if="tx_type == 'EscrowCreate'"         />
    <EscrowCancelTx         :tx="tx" v-else-if="tx_type == 'EscrowCancel'"         />
    <EscrowFinishTx         :tx="tx" v-else-if="tx_type == 'EscrowFinish'"         />
    <TrustSetTx             :tx="tx" v-else-if="tx_type == 'TrustSet'"             />
    <SignerListSetTx        :tx="tx" v-else-if="tx_type == 'SignerListSet'"        />
    <AccountSetTx           :tx="tx" v-else-if="tx_type == 'AccountSet'"           />
    <PaymentChannelClaimTx  :tx="tx" v-else-if="tx_type == 'PaymentChannelClaim'"  />
    <PaymentChannelCreateTx :tx="tx" v-else-if="tx_type == 'PaymentChannelCreate'" />
    <PaymentChannelFundTx   :tx="tx" v-else-if="tx_type == 'PaymentChannelFund'"   />
  </div>
</template>

<script>
import PaymentTx              from './tx_types/Payment.vue'
import OfferCreateTx          from './tx_types/OfferCreate.vue'
import OfferCancelTx          from './tx_types/OfferCancel.vue'
import EscrowCreateTx         from './tx_types/EscrowCreate.vue'
import EscrowCancelTx         from './tx_types/EscrowCancel.vue'
import EscrowFinishTx         from './tx_types/EscrowFinish.vue'
import TrustSetTx             from './tx_types/TrustSet.vue'
import SignerListSetTx        from './tx_types/SignerListSet.vue'
import AccountSetTx           from './tx_types/AccountSet.vue'
import PaymentChannelClaimTx  from './tx_types/PaymentChannelClaim.vue'
import PaymentChannelCreateTx from './tx_types/PaymentChannelCreate.vue'
import PaymentChannelFundTx   from './tx_types/PaymentChannelFund.vue'

var HasTx = require('../mixins/has_tx').default;

// TODO: test all tx type edge cases, capture txs representing all possibilities

export default {
  name: 'TxSummary',

  mixins : [HasTx],

  components : {
    PaymentTx,
    OfferCreateTx,
    OfferCancelTx,
    EscrowCreateTx,
    EscrowCancelTx,
    EscrowFinishTx,
    TrustSetTx,
    SignerListSetTx,
    AccountSetTx,
    PaymentChannelClaimTx,
    PaymentChannelCreateTx,
    PaymentChannelFundTx
  },

  computed : {
    title : function(){
      return this.tx_type + " @ " + this.formatted_date;
    }
  }
}
</script>

<style scoped>
.tx_summary{
  padding: 10px;
  font-family: var(--theme-font1);
}

.tx_summary.failed{
  background-color: #faf2f1;
}
</style>
