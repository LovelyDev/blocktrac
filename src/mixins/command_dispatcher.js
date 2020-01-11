module.exports = {
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
