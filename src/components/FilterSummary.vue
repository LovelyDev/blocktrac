<template>
  <div class="filter_container">
    <div class="filter_header">
      <h2><u>{{filter.name}}</u></h2>

      <div class="filter_controls">
        <div class="filter_control edit_filter_control" v-b-modal="'edit_filter' + filter.id">
          <img src="../assets/gear.png" width="22px" title="Edit" />
        </div>

        <b-modal :id="'edit_filter' + filter.id" title="Edit Filter">
          <CreateEditFilter :filter="filter" />
        </b-modal>

        <div class="filter_control delete_filter_control" v-b-modal="'delete_filter' + filter.id">
          <img src="../assets/minus.png" width="22px" title="Delete" />
        </div>

        <b-modal :id="'delete_filter' + filter.id" title="Delete Filter">
          <h3>Are you sure you want to delete filter:</h3>
          <h4><i>{{filter.name}}</i>?</h4>
          <h5>This action cannot be undone</h5>
        </b-modal>

        <div class="filter_control test_filter_control" title="Test" v-b-modal="'test_filter' + filter.id">
          <u>Test</u>
        </div>

        <b-modal :id="'test_filter' + filter.id"
              :title="'Test Filter: ' + filter.name" ok-only>
          <FilterTester :filter="filter" />
        </b-modal>
      </div>
    </div>

    <div v-if="is_template_filter">
      <h3 :title="template.jsonpath">Template: {{template.name}}</h3>
      <h4>Parameters:</h4>
      <ul v-for="(param, index) in filter.params" :key="filter.id + index">
        <li>{{template.params[index]}}: {{param}}</li>
      </ul>
    </div>

    <div v-else>
      <h3>Expression: {{filter.jsonpath}}</h3>
    </div>

    <template v-if="has_sinks">
      <div v-if="multiple_sinks">
        <h3>Sinks:</h3>
        <ul>
          <li v-for="sink in sinks" :key="sink.id">
            {{sink.type}}: {{sink.target}}
          </li>
        </ul>
      </div>

      <div v-else>
        <h3>Sink:</h3>
        <h4 style="padding-left: 25px">{{sinks[0].type}}: {{sinks[0].target}}</h4>
      </div>
    </template>
  </div>
</template>

<script>
import CreateEditFilter from './CreateEditFilter.vue'
import FilterTester      from './FilterTester.vue'

var ServerLoader = require('../mixins/server_loader').default

export default {
  name: 'Filters',

  mixins : [ServerLoader],

  components : {
    CreateEditFilter,
    FilterTester
  },

  props : {
    filter : Object
  },

  data : function(){
    return {
      sinks : []
    };
  },

  computed : {
    is_template_filter : function(){
      return !!this.filter.template;
    },

    template : function(){
      if(!this.is_template_filter) return null;

      return this.templates[this.filter.template];
    },

    multiple_sinks : function(){
      return this.$store.state.multiple_sinks;
    },

    has_sinks : function(){
      return this.sinks.length > 0;
    }
  },

  created : function(){
    this.load_sinks(function(sinks){
      this.filter.sinks.forEach(function(f){
        var sink = sinks.filter(function(s){ return s.id == f })[0];
        this.sinks.push(sink);
      }.bind(this))
    }.bind(this));

    this.load_templates(function(templates){
      this.templates = templates;
    }.bind(this));
  }
}
</script>

<style scoped>
.filter_container{
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}

.filter_header{
  display: flex;
  justify-content: space-between;
}

.filter_controls{
  display: flex;
  flex-direction: row-reverse;
}

.filter_control{
  padding: 3px;
  margin: 3px;
}

.filter_control:hover{
  cursor: pointer;
}
</style>
