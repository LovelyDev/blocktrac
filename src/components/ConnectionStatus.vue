<template>
  <b-toast id="connection_status"
           variant="danger"
           toaster="b-toaster-bottom-full"
           no-auto-hide
           no-close-button>
    <div id="container">
      <b>Lost connection to server... Reconnecting...</b>
      <b-spinner type="grow" />
    </div>
  </b-toast>
</template>

<script>
export default {
  name: 'ConnectionStatus',

  computed : {
    connected : function(){
      return this.$store.state.socket.isConnected;
    }
  },

  watch : {
    connected : function(){
      if(!this.connected)
        this.$bvToast.show('connection_status');
      else
        this.$bvToast.hide('connection_status');
    }
  }
}
</script>

<style scoped>
#container{
  display: flex;
  align-items: center;
}
</style>
