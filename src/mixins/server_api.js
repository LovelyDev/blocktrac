import config from '../config'
import util   from '../util'

// NOTE: some of these methods/data require the auth_header
//       provided by the 'authentication' mixin!

export default {
  computed : {
    backend_url : function(){
      return config.BACKEND_URL;
    },

    templates : {
      set : function(templates){
        this.$store.commit('set_templates', templates);
      },

      get : function(){
        return this.$store.state.templates;
      }
    },

    sinks : {
      set : function(sinks){
        this.$store.commit('set_sinks', sinks);
      },

      get : function(){
        return this.$store.state.sinks;
      }
    },

    filters : {
      set : function(filters){
        this.$store.commit('set_filters', filters);
      },

      get : function(){
        return this.$store.state.filters;
      }
    },

    matched_txs : {
      set : function(matched_txs){
        this.$store.commit('set_matched_txs', matched_txs);
      },

      get : function(){
        return this.$store.state.matched_txs;
      }
    },

    filter : {
      set : function(filter){
        this.$store.commit('set_active_filter', filter);
      },

      get : function(){
        return this.$store.state.active_filter;
      }
    }
  },

  methods : {
    set_active_filter : function(filter){
      this.filter = filter;

      const replace = this.filters.find(function(f){
                        return f.id == filter.id;
                      });

      if(replace)
        this.filters.splice(this.filters.indexOf(replace),
                            1, this.filter);
      else
        this.filters.push(filter);

      if(this.$route.path != "/filter/" + filter.id)
        this.$router.push("/filter/" + filter.id);
    },

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
                  const msg = util.capitalize(err.body.error)
                  alert("Could not retrieve templates: " + msg)
                }.bind(this))
    },

    load_sinks : function(){
      this.$http.get(this.backend_url + "/sinks", this.auth_header)
                .then(function(response){
                    // clear sinks
                    this.sinks = [];

                    // parse and populate
                    response.body.forEach(function(sink){
                      this.sinks.push(sink)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not retrieve sinks: " + msg)
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
                  const msg = util.capitalize(err.body.error)
                  alert("Could not retrieve filters: " + msg)
                }.bind(this))
    },

    load_filter : function(id){
      this.$http.get(this.backend_url + "/filter/" + id, this.auth_header)
                .then(function(response){
                  this.filter = response.body;
                  this.filter.params = JSON.parse(this.filter.params);
                  if(this.filter.Template)
                    this.filter.Template.params = JSON.parse(this.filter.Template.params)

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not retrieve filter: " + msg)
                }.bind(this))
    },

    load_matched_txs : function(id){
      this.$http.get(this.backend_url + "/filter/" + id + "/matches", this.auth_header)
                .then(function(response){
                  // clear matched txs
                  this.matched_txs = []

                  response.body.forEach(function(matched_tx){
                    this.matched_txs.push(JSON.parse(matched_tx.raw))
                  }.bind(this))

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not retrieve filter matches: " + msg)
                }.bind(this))
    }
  }
}
