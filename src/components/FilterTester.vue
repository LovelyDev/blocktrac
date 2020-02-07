<template>
  <table>
    <tr>
      <td colspan="2" style="text-align: center">
        <u><b>{{jsonpath}}</b></u>
      </td>
    </tr>

    <template v-for="test in tests">
      <tr :key="test.id"
        @click="toggle_details(test)"
          class="test_results">
        <td>{{test.name}}</td>
        <td class="test_glyph">
          <img width=15
                :src="result_glyph(test)" />
        </td>
      </tr>

      <tr :key="test.id + '_details'"
        v-show="details[test.id]"
          class="test_details">
        <td colspan="2">
          <renderjson :data="test.json" />
        </td>
      </tr>
    </template>
  </table>
</template>

<script>
import renderjson from '../vendor/renderjson/renderjson.vue'

var jsonpath = require('../vendor/jsonpath')
jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

export default {
  name: 'FilterTester',

  components : {
    renderjson
  },

  props : {
    filter : Object,
     tests : Array
  },

  data : function(){
    return {
       details : {},
       results : {},
      jsonpath : ''
    };
  },

  methods : {
    toggle_details : function(test){
      this.details[test.id] = !this.details[test.id]
    },

    success : function(test){
      return this.results[test.id];
    },

    result_glyph : function(test){
      if(this.success(test))
        return require('../assets/green-check.svg');
      else
        return require('../assets/red-x.svg');
    }
  },

  created : function(){
    if(this.filter.Template){
      var _jsonpath = this.filter.Template.jsonpath;
      this.filter.params.forEach(function(param, p){
        _jsonpath = _jsonpath.replace("PARAM_" + (p+1), param);
      });
      this.jsonpath = _jsonpath;

    }else
      this.jsonpath = this.filter.jsonpath;

    ///

    this.tests.forEach(function(test){
      this.$set(this.details, test.id, false);

      var result = jsonpath.query(test.json, this.jsonpath).length != 0;
      this.$set(this.results, test.id, result);
    }.bind(this));
  }
}
</script>

<style scoped>
table{
  width: 100%;
  table-layout: fixed;
}

.test_results{
  cursor: pointer;
}

.test_glyph{
  text-align: right;
}
</style>
