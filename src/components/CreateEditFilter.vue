<template>
  <table id="create_edit_table">
    <tr>
      <td colspan="2">
        <div id="filter_type">
          <span id="by_category"
               :class="is_template_filter ? 'active' : ''"
               @click="set_filter_type('template')">
            <span>By Category</span>
          </span>

          <span id="by_expression"
               :class="is_expression_filter ? 'active' : ''"
               @click="set_filter_type('expression')">
            <span>By Expression</span>
          </span>
        </div>
      </td>
    </tr>

    <tr v-if="is_template_filter">
      <td class="label">Category</td>

      <td>
        <b-form-select v-model="template">
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
                 v-model="params[p-1]" />
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

    <tr>
      <td></td>
    </tr>

    <tr>
      <td></td>
    </tr>

    <tr>
      <td></td>
    </tr>
  </table>
</template>

<script>
import ServerAPI from '../mixins/server_api'

export default {
  name: 'CreateEditFilter',

  mixins : [ServerAPI],

  data : function(){
    return {
      filter_type : 'template',
      template : null,
      params : [],
      jsonpath : '',
      name : ''
    };
  },

  computed : {
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
    }
  },

  created : function(){
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
</style>
