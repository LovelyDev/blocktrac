<template>
  <div id="filter_header">
    <div id="filter_subheader">
      <div id="filter_subheader_icon">
        <img v-if="is_filter_page" src="../assets/down-triangle-lines-white.svg" />
        <img v-if="is_test_page"   src="../assets/repeat.svg" />
      </div>

      <div>
        <FilterSummary :filter="filter" />
      </div>

    </div>

    <FilterActions />
  </div>
</template>

<script>
import FilterPages   from '../mixins/filter_pages'
import ServerAPI     from '../mixins/server_api'


import FilterSummary from './FilterSummary'
import FilterActions from './FilterActions'

export default {
  name: 'FilterHeader',

  mixins : [FilterPages, ServerAPI],

  components : {
    FilterSummary,
    FilterActions
  }
}
</script>

<style scoped>
#filter_header{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--theme-color3);
}

#filter_subheader{
  display: flex;
  align-items: center;
}

#filter_subheader_icon{
  background-color: var(--theme-color1);
  margin-right: 10px;
  padding: 10px 13px;
  border-radius: 50%;
}
</style>
