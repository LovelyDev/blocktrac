<template>
  <div id="txs_controls">
    <span id="txs_play_pause" class="txs_icon" v-on:click="play_pause()">
      <img v-if="paused" src="../assets/play.svg" width="22px" />
      <img v-else        src="../assets/pause.svg" width="22px" />
    </span>

    <span id="clear_txs" class="txs_icon" v-on:click="clear_txs">
      <img src="../assets/trash.svg" width="22px" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'TxsControl',

  computed : {
    paused : function(){
      return this.$store.state.paused_txs;
    }
  },

  methods : {
    play_pause : function(){
      this.$store.commit('toggle_paused_txs');
    },

    clear_txs : function(){
      this.$store.commit('clear_txs');
    }
  }
}
</script>

<style scoped>
#txs_controls{
  text-align: right;
  margin-top: 5px;
}

.txs_icon {
  display: inline-block;
  cursor: pointer;

  border-top: 1px solid #f5f5f6;
  background-color: white;
}

.txs_icon:first-child {
  border-left: 1px solid #f5f5f6;
}

.txs_icon:last-child {
  border-right: 1px solid #f5f5f6;
}

img{
  opacity: 0.4;
}
</style>
