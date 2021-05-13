<!--
  * BlockEstimate Component
  * Displays estimated countdown to next block w/ leader text
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="block_estimate">
    <span >The latest {{txs.length}} {{active_blockchain_upper}} transactions are displayed.</span>&nbsp;
    <span>Next block @ (approx)
      <span id="block_estimated_time"
        :class="{elapsed : estimated_time_elapsed}">
          {{formatted_estimated_time || '...'}}
      </span>
    </span>
  </div>
</template>

<script>
import Blockchain from '../mixins/blockchain'

export default {
  name: 'BlockEstimate',

  mixins : [Blockchain],

  data : function(){
    return {
      estimated_timer : null,
       estimated_time : null
    }
  },

  computed : {
    txs : function(){
      return this.$store.state.txs;
    },

    formatted_estimated_time : function(){
      if(!this.estimated_time) return null;
      return this.$options.filters.moment(this.estimated_time.getTime(),"YYYY-MM-DD HH:mm:ss");
    },

    estimated_time_elapsed : function(){
      return new Date() > this.estimated_time;
    }
  },

  created : function(){
    this.estimated_time = this.network.next_block_time();

    this.estimated_timer =
      setInterval(function(){
        this.estimated_time = this.network.next_block_time();
      }.bind(this), 500);
  },

  destroyed : function(){
    clearInterval(this.estimated_timer);
  }
}
</script>

<style scoped>
#block_estimate{
  padding: 10px;
  font-family: var(--theme-font2);
  display: flex;
  justify-content: space-between;
}

#block_estimated_time{
  animation: blinker 1s linear infinite;
}

#block_estimated_time.elapsed{
  color: red;
}
</style>
