<template>
  <table>
    <tr v-for="test in tests" :key="test.id">
      <td :title="test.json">{{test.name}}</td>
      <td>
        <img style="width: 22px"
              :src="success ? '../assets/green-check.svg' :
                              '../assets/red-x.svg'" />
      </td>
    </tr>
  </table>
</template>

<script>
var ServerLoader = require('../mixins/server_loader').default

export default {
  name: 'FilterTester',

  mixins : [ServerLoader],

  props : {
    "filter" : Object
  },

  data : function(){
    return {
      tests : []
    };
  },

  created : function(){
    this.load_filter_tests(function(tests){
      tests.forEach(function(test){
        this.tests.push(test);
      });
    }.bind(this));
  }
}
</script>

<style scoped>
</style>
