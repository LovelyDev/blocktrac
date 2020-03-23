<template>
  <div id="txs_controls">
    <span id="txs_play_pause" class="txs_icon" v-on:click="play_pause()">
      <img v-if="paused" src="../assets/play.svg" width="22px" />
      <img v-else        src="../assets/pause.svg" width="22px" />
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
    launch_settings : function(){
    },

    play_pause : function(){
      this.$store.commit('toggle_paused_txs');
    }
  }
}
</script>

<style scoped>
#txs_controls{
  text-align: right;
}

.txs_icon {
  margin: 2px;
  padding: 2px;
  border-radius: 15px;
  cursor: pointer;
}

img{
  opacity: 0.4;
}
</style>
