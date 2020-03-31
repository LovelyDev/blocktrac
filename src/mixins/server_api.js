import config from '../config'

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
    update_filter : function(filter){
      this.filter = filter;

      const replace = this.filters.find(function(f){
                        return f.id == filter.id;
                      });
      this.filters.splice(this.filters.indexOf(replace), 1, this.filter);
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
                  if(this.filter.Template)
                    this.filter.Template.params = JSON.parse(this.filter.Template.params)

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    },

    load_matched_txs : function(id){
      // TODO
    }
  }
}
