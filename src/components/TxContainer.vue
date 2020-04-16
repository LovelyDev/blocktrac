<template>
  <div class="tx_container">
    <div class="tx_icon">
      <div class="tx_icon_wrapper"
          :class="success ? 'success' : 'failed'">
        <img :src="tx_icon" />
      </div>
    </div>

    <div class="tx_timestamp_type">
      <div class="tx_timestamp tx_detail_label">
        {{formatted_date}}
      </div>

      <div class="tx_type">
        {{tx_short_type}}
      </div>
    </div>

    <div class="account">
      <div class="tx_detail_label">
        <img src="../assets/person-icon.png" />&nbsp;
        <span>Account</span>
      </div>

      <AccountLink :account="account" />
    </div>

    <slot></slot>
  </div>
</template>

<script>
import AccountLink from './AccountLink.vue'

var HasTx = require('../mixins/has_tx').default

export default {
  name: 'TxContainer',

  mixins : [HasTx],

  components : {
    AccountLink
  },

  computed : {
    tx_icon : function(){
      // TODO: failed = white
      const color = this.success ? 'blue' : 'gray';
      const asset = this.tx_category
                         .replace(" ", "-")
                         .toLowerCase() +
                    '-' + color + '.png';

      return require('../assets/txs/' + asset);
    }
  }
}
</script>

<style scoped>
.tx_container{
  display: flex;
}

.tx_icon{
  flex-basis: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx_icon_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.tx_icon_wrapper.success{
  background-color: #ebf4ff;
}

.tx_icon_wrapper.failed{
  background-color: #d05136;
}

.tx_timestamp_type{
  flex-basis: 14%;

  display: flex;
  flex-direction: column;
}

.tx_timestamp{
  font-size: 0.7rem;
}

.account{
  flex-basis: 32%;
  font-size: 0.8rem;
}
</style>
