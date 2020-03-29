import config from '../config'

// NOTE: some of these methods/data require the auth_header
//       provided by the 'authentication' mixin!

export default {
  data : function(){
    return {
      templates : []
    };
  },

  computed : {
    backend_url : function(){
      return config.BACKEND_URL;
    },
  },

  methods : {
    load_templates : function(){
      this.$http.get(this.backend_url + "/templates")
                .then(function(response){
                    response.body.forEach(function(template){
                      template.params = JSON.parse(template.params);
                      this.templates.push(template)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
