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
                 v-model="fsinks" multiple>
            <option v-for="sink in sinks"
                     :key="'sink-' + sink.id"
                   :value="sink.id">
              {{sink.type}}: {{sink.target}}
            </option>
          </select>

          <select v-else
                 class="sink_select"
                 v-model="sink">
            <option v-for="sink in sinks"
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
            <option v-for="template_option in templates"
                    :key="'template-' + template_option.id"
                    :value="template_option">
              {{template_option.name}}
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
        <tr v-for="p in template_params.length"
            :key="'param-' + p">
          <td>
            <template v-if="p == 1">
              <h3>Params:</h3>
            </template>
          </td>

          <td>
            <input class="param_input"
                   type="text"
                   :placeholder="template_params[p-1]"
                   :value="params[p-1]" />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import FilterHelp from './FilterHelp.vue'

export default {
  name: 'CreateEditFilter',

  components : {
    FilterHelp
  },

  props : {
       filter : Object,
    templates : Array,
        sinks : Array
  },

  data : function(){
    return {
      name     : '',
      sink     : '',
      fsinks   : [],
      is_template_filter : true,
      jsonpath : '',
      template : null,
      params   : []
    };
  },

  computed : {
    server_params : function(){
      var params = {
        name : this.name,
      }

      if(this.multiple_sinks)
        params['Sinks'] = this.fsinks
      else
        params['Sinks'] = [this.sink]

      if(this.is_template_filter){
        params['Template'] = this.template
        params['params']   = this.params

      }else
        params['jsonpath'] = this.jsonpath

      return params;
    },

    has_filter : function(){
      return !!this.filter;
    },

    multiple_sinks : function(){
      return this.$store.state.multiple_sinks;
    },

    template_has_params : function(){
      return this.template_params.length > 0;
    },

    template_params : function(){
      return Object.keys(this.template.params)
    }
  },

  methods : {
    set_jsonpath : function(jsonpath){
      this.jsonpath = jsonpath;
      this.$refs["filter_help"].hide();
    }
  },

  created : function(){
    if(this.has_filter){
      this.name = this.filter.name;

      this.filter.Sinks.forEach(function(s){
        this.sinks.push(s);
      }.bind(this));

      this.sink = this.sinks[0];

      if(this.filter.jsonpath){
        this.jsonpath = this.filter.jsonpath;
        this.is_template_filter = false;
      }

      if(this.filter.Template)
        this.template = this.filter.Template;

      if(this.filter.params)
        this.filter.params.forEach(function(p){
          this.params.push(p);
        }.bind(this));

    }else
      this.template = this.templates[0];
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
