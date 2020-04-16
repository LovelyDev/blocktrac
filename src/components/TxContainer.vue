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

    <AccountDetail :account="account" text="Account" />

    <slot></slot>
  </div>
</template>

<script>
import AccountDetail from './AccountDetail.vue'

var HasTx = require('../mixins/has_tx').default

export default {
  name: 'TxContainer',

  mixins : [HasTx],

  components : {
    AccountDetail
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
</style>
