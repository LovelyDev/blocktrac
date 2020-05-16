<!--
  * Create Edit Filter Form
  * Primary form used to create and edit jsonpath-based and
  * template-based filters.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <table class="form_table">
      <tr v-if="!editing_filter && !saving_filter">
        <td colspan="2">
          <div id="filter_type">
            <span id="by_category"
                 :class="{active : is_template_filter}"
                 @click="set_filter_type('template')">
              <span>By Category</span>
            </span>

            <span id="by_expression"
                 :class="{active : is_expression_filter}"
                 @click="set_filter_type('expression')">
              <span>By Expression</span>
            </span>
          </div>
        </td>
      </tr>

      <tr v-if="is_template_filter">
        <td class="form_text">Category:</td>

        <td>
          <b-form-select v-model="template"
                         :disabled="editing_filter"
                         class="form_text">
            <b-form-select-option v-for="template in templates"
                                 :key="'template' + template.id"
                                 :value="template.id">
              {{template.name}}
            </b-form-select-option>
          </b-form-select>
        </td>
      </tr>

      <template v-if="is_template_filter && template_has_params">
        <tr v-for="p in template_params.length"
            :key="'param' + p">
          <td>
            <span class="form_text">{{template_params[p-1]['name']}}:</span>
          </td>

          <td>
            <!-- XXX: tried making this numeric for appropriate param types but
                      caused more styling issues than it's worth, just convert below -->
            <input class="form_input"
                   type="text"
                   v-model="params[p-1]"
                   :disabled="editing_filter" />

            <div class="form_text form_error">
              <span v-if="is_template_filter &&
                         !is_template_param_valid(params[p-1],
                                         template_params[p-1])">
                Must be a{{template_params[p-1]['type'] == 'Integer' ? 'n' : ''}}
                {{template_params[p-1]['type'].toLowerCase()}}
              </span>
              <span v-else class="placeholder" />
            </div>
          </td>
        </tr>
      </template>

      <tr v-if="is_expression_filter">
        <td class="form_text">Expression:</td>

        <td>
          <input class="form_input"
                 type="text"
                 title="expression"
                 placeholder="JSONPath Expression..."
                 v-model="jsonpath" />

          <div class="form_text form_error">
            <span v-if="is_expression_filter && !has_expression">
              Expression required
            </span>
            <span v-else-if="is_expression_filter && !valid_expression">
              Invalid expression
            </span>
            <span v-else class="placeholder" />
          </div>
        </td>
      </tr>

      <tr>
        <td class="form_text">Filter Name:</td>

        <td>
          <input class="form_input"
                 type="text"
                 v-model="name" />

          <div class="form_text form_error">
            <span v-if="!has_name">Name required</span>
            <span v-else class="placeholder" />
          </div>
        </td>
      </tr>

      <tr>
        <td colspan=2>
          <div id="send_me" class="form_text">
            Send Me Notifications Via:
          </div>
        </td>
      </tr>
    </table>

    <SinksInputs ref="sinks_inputs" />
  </div>
</template>

<script>
import SinksInputs    from './SinksInputs'
import ServerAPI      from '../../mixins/server_api'
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

import util           from '../../util'

export default {
  name: 'CreateEditFilterForm',

  mixins : [ServerAPI, Authentication, Validator],

  components : {
    SinksInputs
  },

  props : {
    edit_filter : Object,
    duplicate_filter : Object,
    save_filter : Object
  },

  data : function(){
    return {
      filter_type : 'template',

      template : null,
      params : [],
      jsonpath : '',
      name : '',
    };
  },

  computed : {
    editing_filter : function(){
      return !!this.edit_filter;
    },

    saving_filter : function(){
      return !!this.save_filter;
    },

    is_template_filter : function(){
      return this.filter_type == 'template';
    },

    is_expression_filter : function(){
      return this.filter_type == 'expression';
    },

    ///

    has_name : function(){
      return this.name != '';
    },

    has_expression : function(){
      return this.jsonpath != ''
    },

    valid_expression : function(){
      return this.has_expression &&
             util.is_valid_jsonpath(this.jsonpath);
    },

    params_are_valid : function(){
      if(!this.template_has_params) return true;

      if(this.params.length != this.template_params.length)
        return false;

      for(var p = 0; p < this.template_params.length; p += 1){
        const param = this.params[p]
        const template_param = this.template_params[p]
        if(!this.is_template_param_valid(param, template_param))
          return false;
      }

      return true;
    },

    is_valid : function(){
      return this.name &&
           ((this.is_expression_filter && this.valid_expression) ||
            (this.is_template_filter   && this.params_are_valid))
    },

    ///

    selected_template : function(){
      return this.templates.find(function(t){
               return t.id == this.template;
             }.bind(this));
    },

    template_has_params : function(){
      return this.template_params.length > 0;
    },

    template_params : function(){
      if(!this.selected_template) return[];

      return this.selected_template.params
    },

    ///

    converted_params : function(){
      var converted = [];

      for(var p = 0; p < this.template_params.length; p += 1){
        const param = this.params[p]
        const template_param = this.template_params[p]

        if(template_param.type == 'Integer')
          converted.push(parseInt(param))

        else if(template_param.type == 'Float')
          converted.push(parseFloat(param))

        else
          converted.push(param)
      }

      return converted;
    },

    server_params : function(){
      var params = {
        name : this.name,
      }

      if(!this.editing_filter){
        if(this.is_template_filter){
          params['template'] = this.template;
          params['params']   = JSON.stringify(this.converted_params)

        }else
          params['jsonpath'] = this.jsonpath
      }

      params['sinks'] = Object.values(this.$refs.sinks_inputs.$data.selected)
                              .flat().map(function(sink){ return sink.value })

      return params;
    },

    client_params : function(){
      var params = {
        name : this.name,
      }

      if(this.is_template_filter){
        params['Template'] = this.selected_template;
        params['params']   = this.converted_params;

      }else
        params['jsonpath'] = this.jsonpath

      return params;
    }
  },

  watch : {
    templates : function(){
      // set initial template
      if(this.template == null)
        this.template = this.templates[0].id;
    }
  },

  methods : {
    set_filter_type : function(type){
      this.filter_type = type;
    },

    is_template_param_valid : function(param, template_param){
      if(param == '' || param == null) return false;

      if(template_param['type'] == 'String' &&
        !util.is_valid_string(param))
        return false;

      else if(template_param['type'] == 'Integer' &&
             !util.is_valid_integer(parseInt(param)))
        return false;

      else if(template_param['type'] == 'Float' &&
             !util.is_valid_integer(parseInt(param)) &&
             !util.is_valid_float(parseFloat(param)))
        return false;

      return true;
    },

    ///

    parse_edit_filter : function(){
      this.name = this.edit_filter.name;

      if(this.edit_filter.Template){
        this.filter_type = 'template';
        this.template = this.edit_filter.Template.id;
        this.params = this.edit_filter.params;

      }else{
        this.filter_type = 'expression';
        this.jsonpath = this.edit_filter.jsonpath;
      }
    },

    parse_duplicate_filter : function(){
      this.name = this.duplicate_filter.name + " (copy)";

      if(this.duplicate_filter.Template){
        this.filter_type = 'template';
        this.template = this.duplicate_filter.Template.id;
        this.params = this.duplicate_filter.params;

      }else{
        this.filter_type = 'expression';
        this.jsonpath = this.duplicate_filter.jsonpath;
      }
    },

    parse_save_filter : function(){
      if(this.save_filter.jsonpath){
        this.filter_type = 'expression';
        this.jsonpath = this.save_filter.jsonpath;
      }
    }
  },

  created : function(){
    if(this.edit_filter)
      this.parse_edit_filter();

    if(this.duplicate_filter)
      this.parse_duplicate_filter();

    if(this.save_filter)
      this.parse_save_filter();

    this.load_templates();
  }
}
</script>

<style scoped>
#filter_type{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}

#filter_type span{
  width: 50%;
  padding: 5px;
  background-color: #E8F5FF;
  text-align: center;
}

#filter_type span span{
  display: inline-block;
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
  font-family: var(--theme-font1);
  font-size: 0.9rem;
  color: var(--theme-color2);
  opacity: 0.8;
}

#filter_type span.active span{
  background-color: white;
  font-family: "Inter Semi Bold";
  color: var(--theme-color1);
  opacity: unset;
}

#by_category{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

#by_expression{
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

#send_me{
  font-family: var(--theme-font5);
  margin-top: 20px;
}
</style>
