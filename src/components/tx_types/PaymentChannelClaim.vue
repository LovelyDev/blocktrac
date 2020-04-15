<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div class="tx_detail_label">
        <img src="../../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>

      <AccountLink :account="account" />
    </div>

    <div class="balance_amount">
      <div class="tx_detail_label">
        <span v-if="has_amount">Amount</span>
        <span v-if="has_amount && has_balance">/</span>
        <span v-if="has_balance">Balance</span>
      </div>

      <span v-if="has_amount">{{amount}}</span>
      <span v-if="has_amount && has_balance">/</span>
      <span v-if="has_balance">{{balance}}</span>
    </div>

    <div class="status">
      <span v-if="renewed"     style="color: green">Renewed</span>
      <span v-else-if="closed" style="color: red">Closed</span>
    </div>

    <div class="tx_pad"></div>
  </TxContainer>
</template>

<script>
import TxContainer from '../TxContainer.vue'
import AccountLink from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'PaymentChannelClaimTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    AccountLink
  },

  computed : {
    account : function(){
      return this.tx_obj["Account"];
    },

    amount : function(){
      return this.tx_obj["Amount"];
    },

    has_amount : function(){
      return !!this.amount;
    },

    balance : function(){
      return this.tx_obj["Balance"];
    },

    has_balance : function(){
      return !!this.balance;
    },

    flags : function(){
      return this.tx_obj["Flags"];
    },

    renewed : function(){
      return this.flags & 0x00010000;
    },

    closed : function(){
      return this.flags & 0x00020000;
    }
  }
}
</script>

<style scoped>
.account{
  flex-basis: 32%;
  font-size: 0.8rem;
}

.balance_amount{
  flex-basis: 39%;
}

.status{
  flex-basis: 7%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
