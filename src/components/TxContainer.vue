<template>
  <div class="tx_container">
    <div class="tx_icon">
      <div class="tx_icon_wrapper"
          :class="success ? 'success' : 'failed'">
        <img :src="tx_icon" />
      </div>
    </div>

    <div class="tx_timestamp_type">
      <div class="tx_timestamp">
        {{formatted_date}}
      </div>

      <div class="tx_type">
        {{tx_type}}
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
var HasTx = require('../mixins/has_tx').default

export default {
  name: 'TxContainer',

  mixins : [HasTx],

  computed : {
    tx_icon : function(){
      // TODO: failed = white
      const color = this.success ? 'blue' : 'gray';

      return require('../assets/txs/' +
                     this.tx_category.toLowerCase() +
                     '-' + color + '.png');
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
  flex-basis: 17%;

  display: flex;
  flex-direction: column;
}

.tx_timestamp{
  font-size: 0.7rem;
}
</style>
