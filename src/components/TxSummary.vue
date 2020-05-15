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
    <AccountDeleteTx        :tx="tx" v-else-if="tx_type == 'AccountDelete'"        />
    <PaymentChannelClaimTx  :tx="tx" v-else-if="tx_type == 'PaymentChannelClaim'"  />
    <PaymentChannelCreateTx :tx="tx" v-else-if="tx_type == 'PaymentChannelCreate'" />
    <PaymentChannelFundTx   :tx="tx" v-else-if="tx_type == 'PaymentChannelFund'"   />
  </div>
</template>

<script>
import PaymentTx              from './tx_types/Payment'
import OfferCreateTx          from './tx_types/OfferCreate'
import OfferCancelTx          from './tx_types/OfferCancel'
import EscrowCreateTx         from './tx_types/EscrowCreate'
import EscrowCancelTx         from './tx_types/EscrowCancel'
import EscrowFinishTx         from './tx_types/EscrowFinish'
import TrustSetTx             from './tx_types/TrustSet'
import SignerListSetTx        from './tx_types/SignerListSet'
import AccountSetTx           from './tx_types/AccountSet'
import AccountDeleteTx        from './tx_types/AccountDelete'
import PaymentChannelClaimTx  from './tx_types/PaymentChannelClaim'
import PaymentChannelCreateTx from './tx_types/PaymentChannelCreate'
import PaymentChannelFundTx   from './tx_types/PaymentChannelFund'
import HasTx                  from '../mixins/has_tx'

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
    AccountDeleteTx,
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
