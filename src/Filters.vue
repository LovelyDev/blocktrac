<template>
  <MainLayout section="Filters">
    <div id="filters_container">
      <div id="filters_header">
        <h1>Filters</h1>

        <div id="create_filter_control" v-b-modal.create_filter>
          <img src="./assets/plus.png" width="22px" />
        </div>

        <b-modal id="create_filter"
                 title="Create New Filter"
                 @ok="create_filter">
          <CreateEditFilter ref="new_filter_form"
                            :templates="templates"
                            :sinks="sinks" />
        </b-modal>
      </div>

      <div>
        <FilterSummary v-for="filter in filters"
                       :key="filter.id"
                       :filter="filter"
                       :templates="templates"
                       :sinks="sinks"
                       @updated="load_filters"
                       @deleted="load_filters" />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout       from './components/MainLayout.vue'
import FilterSummary    from './components/FilterSummary.vue'
import CreateEditFilter from './components/CreateEditFilter.vue'

import Authentication   from './mixins/authentication'

export default {
  name: 'Filters',

  mixins : [Authentication],

  components: {
    MainLayout,
    FilterSummary,
    CreateEditFilter
  },

  data : function(){
    return {
        filters : [],
      templates : [],
          sinks : []
    };
  },

  methods : {
    load_filters : function(){
      this.filters   = []

      this.$http.get(this.backend_url + "/filters", this.auth_header)
                .then(function(response){
                    response.body.forEach(function(filter){
                      filter.params = JSON.parse(filter.params)
                      if(filter.Template)
                        filter.Template.params = JSON.parse(filter.Template.params)
                      this.filters.push(filter)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  alert("Could not load filters: " + err.body.error)
                }.bind(this))
    },

    load_templates : function(){
      this.templates = [];

      this.$http.get(this.backend_url + "/templates")
                .then(function(response){
                    response.body.forEach(function(template){
                      template.params = JSON.parse(template.params);
                      this.templates.push(template)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  alert("Could not load templates: " + err.body.error)
                }.bind(this))
    },

    load_sinks : function(){
      this.sinks     = [];

      this.$http.get(this.backend_url + "/sinks", this.auth_header)
                .then(function(response){
                    response.body.forEach(function(sink){
                      this.sinks.push(sink)
                    }.bind(this));

                }.bind(this)).catch(function(err){
                  alert("Could not load sinks: " + err.body.error)
                }.bind(this))
    },

    /////////

    create_filter : function(){
      const filter_params =
        this.$refs.new_filter_form.server_params

      this.$http.post(this.backend_url + "/filter",
                      filter_params, this.auth_header)
                .then(function(response){
                  this.load_filters();

                }.bind(this)).catch(function(err){
                  alert("Could not create filter: " + err.body.error)
                }.bind(this))
    }
  },

  created : function(){
    this.load_filters();
    this.load_templates();
    this.load_sinks();
  }
}
</script>

<style scoped>
#filters_container{
  min-height: 100%;
  width: 85%;
  margin: auto;
  padding: 15px;
  border: 1px solid black;
}

#filters_header{
  display: flex;
  justify-content: space-between;
}

#create_filter_control:hover{
cursor: pointer;
}
</style>
