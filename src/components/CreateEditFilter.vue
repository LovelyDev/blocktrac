<template>
  <div>
    <table id="create_edit_table">
      <tr>
        <td><h3>Name:</h3></td>
        <td><input id="name_input"
                   type="text"
                   v-model="name" /></td>
      </tr>

      <tr>
        <td><h3>Sink{{multiple_sinks ? "s" : ""}}:</h3></td>
        <td>
          <select v-if="multiple_sinks"
                 class="sink_select"
                 v-model="sinks" multiple>
            <option v-for="sink in all_sinks"
                     :key="'sink-' + sink.id"
                   :value="sink.id">
              {{sink.type}}: {{sink.target}}
            </option>
          </select>

          <select v-else
                 class="sink_select"
                 v-model="sink">
            <option v-for="sink in all_sinks"
                     :key="'sink-' + sink.id"
                   :value="sink.id">
              {{sink.type}}: {{sink.target}}
            </option>
          </select>
        </td>
      </tr>

      <!-- TODO additional sinks -->

      <tr>
        <td><h3>Rule:</h3></td>
        <td>
          <b-form-checkbox v-model="is_template_filter" switch>
            {{is_template_filter ? "Template" : "Custom" }}
          </b-form-checkbox>
        </td>
      </tr>

      <tr v-if="is_template_filter">
        <td><h3>Template:</h3></td>
        <td>
          <select v-model="template">
            <option v-for="template_option in Object.keys(templates)"
                    :key="'template-' + template_option"
                    :value="template_option">
              {{templates[template_option].name}}
            </option>
          </select>
        </td>
      </tr>

      <tr v-else>
        <td><h3>Expression:</h3></td>
        <td id="jsonpath_container">
          <span v-b-modal.filter_help><sup>Help</sup></span>
          <input id="jsonpath_input"
                 type="text"
                 title="expression"
                 placeholder="JSONPath Expression"
                 v-model="jsonpath" />

          <b-modal id="filter_help"
                   ref="filter_help"
                   title="JSONPath Help" ok-only>
            <FilterHelp @set="set_jsonpath" />
          </b-modal>
        </td>
      </tr>

      <template v-if="is_template_filter && template_has_params">
        <tr v-for="p in templates[template].params.length"
            :key="'param-' + p">
          <td>
            <template v-if="p == 1">
              <h3>Params:</h3>
            </template>
          </td>

          <td>
            <input class="param_input"
                   type="text"
                   :placeholder="templates[template].params[p-1]"
                   :value="params[p-1]" />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import FilterHelp from './FilterHelp.vue'

var ServerLoader = require('../mixins/server_loader').default

export default {
  name: 'CreateEditFilter',

  mixins : [ServerLoader],

  components : {
    FilterHelp
  },

  props : {
    "filter" : Object
  },

  data : function(){
    return {
      all_sinks : [],

      ///

      name     : '',
      sink     : '',
      sinks    : [],
      is_template_filter : true,
      jsonpath : '',
      template : '',
      params   : []
    };
  },

  computed : {
    has_filter : function(){
      return !!this.$props.filter;
    },

    multiple_sinks : function(){
      return this.$store.state.multiple_sinks;
    },

    template_has_params : function(){
      return this.templates[this.template].params.length > 0;
    }
  },

  methods : {
    set_jsonpath : function(jsonpath){
      this.jsonpath = jsonpath;
      this.$refs["filter_help"].hide();
    }
  },

  created : function(){
    this.load_sinks(function(sinks){
      sinks.forEach(function(sink){
        this.all_sinks.push(sink);
      }.bind(this));
    }.bind(this));

    this.load_templates(function(templates){
      this.templates = templates;
    }.bind(this));

    this.template = Object.keys(this.templates)[0];

    ///

    if(this.has_filter){
      this.name = this.filter.name;

      this.filter.sinks.forEach(function(s){
        this.sinks.push(s);
      }.bind(this));

      this.sink = this.sinks[0];

      if(this.filter.jsonpath){
        this.jsonpath = this.filter.jsonpath;
        this.is_template_filter = false;
      }

      if(this.filter.template)
        this.template = this.filter.template;

      if(this.filter.params)
        this.filter.params.forEach(function(p){
          this.params.push(p);
        }.bind(this));
    }
  }
}
</script>

<style scoped>
#create_edit_table{
  width: 100%;
}

#name_input{
  width: 100%;
}

#jsonpath_container{
  color: blue;
  cursor: pointer;
}

#jsonpath_input{
  margin-left: 5px;
  width: 89%;
}

.sink_select{
  width: 100%;
}

#new_sink_control:hover{
  cursor: pointer;
}

.param_input{
  width: 100%;
}
</style>
