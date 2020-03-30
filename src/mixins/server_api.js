import config from '../config'

// NOTE: some of these methods/data require the auth_header
//       provided by the 'authentication' mixin!

export default {
  data : function(){
    return {
      templates : [],
        filters : [],
         filter : {}
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
                    // clear templates
                    this.templates = [];

                    // parse and populate
                    response.body.forEach(function(template){
                      template.params = JSON.parse(template.params);
                      this.templates.push(template)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    },

    load_filters : function(){
      this.$http.get(this.backend_url + "/filters", this.auth_header)
                .then(function(response){
                    // clear filters
                    this.filters = [];

                    // parse and populate
                    response.body.forEach(function(filter){
                      filter.params = JSON.parse(filter.params)
                      if(filter.Template)
                        filter.Template.params = JSON.parse(filter.Template.params)
                      this.filters.push(filter)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    },

    load_filter : function(id){
      this.$http.get(this.backend_url + "/filter/" + id, this.auth_header)
                .then(function(response){
                  this.filter = response.body;
                  this.filter.params = JSON.parse(this.filter.params);
                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
