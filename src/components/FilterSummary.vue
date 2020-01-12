<template>
  <div class="filter_container">
    <div class="filter_header">
      <h2><u>{{filter.name}}</u></h2>

      <div class="filter_controls">
        <div class="filter_control edit_filter_control">
          <img src="../assets/gear.png" width="22px" title="Edit" />
        </div>

        <div class="filter_control rm_filter_control">
          <img src="../assets/minus.png" width="22px" title="Remove" />
        </div>

        <div class="filter_control test_filter_control" title="Test">
          <u>Test</u>
        </div>
      </div>
    </div>

    <div v-if="template_filter">
      <h3 :title="template.jsonpath">Template: {{template.name}}</h3>
      <h4>Parameters:</h4>
      <ul v-for="(param, index) in filter.params" :key="filter.id + index">
        <li>{{template.params[index]}}: {{param}}</li>
      </ul>
    </div>

    <div v-else>
      <h3>Expression: {{filter.jsonpath}}</h3>
    </div>
  </div>
</template>

<script>
import templates from '../assets/filter-templates.json'

export default {
  name: 'Filters',

  props : {
    filter : Object
  },

  computed : {
    template_filter : function(){
      return !!this.filter.template;
    },

    template : function(){
      if(!this.template_filter) return null;

      return templates[this.filter.template];
    }
  }
}
</script>

<style>
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
