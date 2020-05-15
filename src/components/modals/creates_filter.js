import util from '../../util'

export default {
  methods : {
    on_ok : function(){
      if(!this.logged_in){
        const client = this.$refs.form.client_params;
        const server = this.$refs.form.server_params;
        const filter = {client, server};

        this.$store.commit('set_in_progress_filter', filter);
        this.$bvModal.show("register_filter_modal");

      }else
        this.create_filter();
    },

    create_filter : function(){
      var params = this.$refs.form.server_params;

      this.$http.post(this.backend_url + "/filter",
                      params, this.auth_header)
                .then(function(response){
                  const filter = response.body;

                  filter.params = JSON.parse(filter.params)
                  if(filter.Template)
                    filter.Template.params = JSON.parse(filter.Template.params)

                  this.$emit('created', filter)

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not create filter: " + msg)
                }.bind(this))
    }
  }
}
