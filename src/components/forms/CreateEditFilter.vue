<template>
  <table id="create_edit_table">
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
      <td class="label">Category</td>

      <td>
        <b-form-select v-model="template" :disabled="editing_filter">
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
          <span class="label">{{template_params[p-1]}}</span>
        </td>

        <td>
          <input class="filter_input"
                 type="text"
                 v-model="params[p-1]"
                 :disabled="editing_filter" />
        </td>
      </tr>
    </template>

    <tr v-if="is_expression_filter">
      <td class="label">Expression</td>

      <td>
        <input class="filter_input"
               type="text"
               title="expression"
               placeholder="JSONPath Expression..."
               v-model="jsonpath" />
      </td>
    </tr>

    <tr>
      <td class="label">Filter Name</td>

      <td>
        <input class="filter_input"
               type="text"
               v-model="name" />
      </td>
    </tr>

    <tr>
      <td colspan=2>
        <div class="label">Send me notifications via:</div>
      </td>
    </tr>

    <!-- TODO advanced sinks controls -->

    <tr>
      <td>
        <b-form-checkbox v-model="enable_email" switch>
          Email
        </b-form-checkbox>
      </td>

      <td>
        <input type="text"
               v-model="email_sinks"
               :disabled="!enable_email"
               class="filter_input" />
      </td>
    </tr>

    <tr v-if="advanced_sinks_disabled">
      <td></td>

      <td>
        Available with <span class="pro">Pro</span> plans
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-model="enable_sms" switch
                        :disabled="advanced_sinks_disabled">
          Text Message
        </b-form-checkbox>
      </td>

      <td>
        <input type="text"
               v-model="sms_sinks"
               :disabled="advanced_sinks_disabled || !enable_sms"
               class="filter_input" />
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-model="enable_webhook" switch
                        :disabled="advanced_sinks_disabled">
          URL
        </b-form-checkbox>
      </td>

      <td>
        <input type="text"
               v-model="webhook_sinks"
               :disabled="advanced_sinks_disabled || !enable_webhook"
               class="filter_input" />
      </td>
    </tr>
  </table>
</template>

<script>
import ServerAPI      from '../../mixins/server_api'
import Authentication from '../../mixins/authentication'

export default {
  name: 'CreateEditFilterForm',

  mixins : [ServerAPI, Authentication],

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

      enable_email : false,
      enable_sms : false,
      enable_webhook : false,

      email_sinks : '',
      sms_sinks : '',
      webhook_sinks : ''
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

      return Object.keys(this.selected_template.params)
    },

    // TODO: more elegant solution,
    //       deduce from fr0xrpl MEMBERSHIP_LEVEL config
    advanced_sinks_disabled : function(){
      return !this.logged_in || this.is_basic_member;
    },

    ///

    server_params : function(){
      var params = {
        name : this.name,
      }

      if(this.is_template_filter){
        params['template'] = this.template;
        params['params']   = JSON.stringify(this.params)

      }else
        params['jsonpath'] = this.jsonpath

      // TODO sinks param (and in client_params below)
      //params['sinks'] = [this.sink]

      return params;
    },

    client_params : function(){
      var params = {
        name : this.name,
      }

      if(this.is_template_filter){
        params['Template'] = this.selected_template;
        params['params']   = this.params;

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
#create_edit_table{
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

#filter_type{
  display: flex;
  justify-content: space-evenly;
}

#filter_type span{
  width: 50%;
  padding: 5px;
  background-color: #eeeeee;
  text-align: center;
  font-weight: bold;
}

#filter_type span span{
  display: inline-block;
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
}

#filter_type span.active span{
  background-color: white;
}

#by_category{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

#by_expression{
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.label{
  font-weight: bold;
}

.filter_input{
  width: 100%;
}

.pro{
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eff2f8;
  color: #629ffb;
}
</style>
