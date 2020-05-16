/*
 * Helper mixin to send commands to the rippled websocket
 * connection, registering callback to be invoked when
 * response is received.
 *
 * Commands are assigned an ID so that responses can be
 * matched w/ the specified callback, and the callback removed
 * when the response is received.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

export default {
  created: function () {
    this.cmd_id = 0;
  },

  methods : {
    sendCmd : function(cmd, cb){
      this.cmd_id += 1;
      cmd.id = this.cmd_id;
      this.$socket.sendObj(cmd);

      if(cb)
        this.$store.commit('on_command', {cmd, cb});
    }
  }
}
