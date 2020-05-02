<template>
  <div class="tx_container">
    <div class="tx_icon"
         @click="nav_to_tx">
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
import AccountDetail from './AccountDetail'
import HasTx         from '../mixins/has_tx'

export default {
  name: 'TxContainer',

  mixins : [HasTx],

  components : {
    AccountDetail
  },

  computed : {
    tx_icon : function(){
      const color = this.success ? 'blue' : 'white';
      const asset = this.tx_category
                         .replace(" ", "-")
                         .toLowerCase() +
                    '-' + color + '.svg';

      return require('../assets/txs/' + asset);
    }
  },

  methods : {
    nav_to_tx : function(){
      this.$router.push("/tx/" + this.hash);
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
  cursor: pointer;
}

.tx_icon_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
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
