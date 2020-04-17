export default {
  methods : {
    on_ok : function(){
      // TODO validate form

      if(!this.logged_in)
        ; // TODO open register dialog,
          // store filter details to be created on register

      else
        this.create_filter();
    },

    create_filter : function(){
      var params = this.$refs.form.server_params;

      this.$http.post(this.backend_url + "/filter",
                      params, this.auth_header)
                .then(function(response){
                  this.$emit('created', response.body);

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
