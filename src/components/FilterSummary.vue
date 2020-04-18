<template>
  <div>
    <div class="filter_title">{{filter.name}}</div>

    <div v-if="filter.Template">
      <!-- TODO human friendly params -->
      {{filter.Template.name}}: {{filter.params.join(", ")}}
    </div>

    <div v-else>
      Expression: {{filter.jsonpath}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',

  props : {
    filter : {
      type : Object,
      required : true
    }
  }
}
</script>

<style scoped>
.filter_title{
  font-weight: bold;
}
</style>
