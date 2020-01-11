<template>
  <span>
    <PaymentChannel v-bind:account="account"
                    v-bind:paychan="paychan"
                    v-bind:amount="amount"
                    v-bind:destination="destination"/>
  </span>
</template>

<script>
import PaymentChannel from '../PaymentChannel.vue'

var HasTx = require('../../mixins/has_tx')

export default {
  name   : 'PaymentChannelFundTx',

  mixins : [HasTx],

  components : {
    PaymentChannel
  },

  computed : {
    account : function(){
      return this.tx_obj["Account"];
    },

    paychan : function(){
      return this.tx_obj["Channel"];
    },

    amount : function(){
      return this.tx_obj["Amount"];
    },

    destination : function(){
      return this.tx_obj["Destination"];
    },
  }
}
</script>
