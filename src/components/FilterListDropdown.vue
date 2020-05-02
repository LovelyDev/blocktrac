<template>
  <div id="my_filters">
    <multiselect :options="filters"
                 placeholder="My Filters"
                 @select="nav_to_filter">
      <template slot="option" slot-scope="props">
        <FilterSummary :filter="props.option" />
      </template>
    </multiselect>
  </div>
</template>

<script>
import FilterSummary  from './FilterSummary'

import Authentication from '../mixins/authentication'
import HasFilters     from '../mixins/has_filters'
import ServerAPI      from '../mixins/server_api'

export default {
  name: 'MyFiltersDropdown',

  mixins : [Authentication, HasFilters, ServerAPI],

  components : {
    FilterSummary
  },

  methods : {
    nav_to_filter : function(filter){
      this.$router.push({path : "/filter/" + filter.id});
    }
  },

  created : function(){
    this.load_filters();
  }
}
</script>

<style scoped>
#my_filters{
  margin: 10px 0;
}
</style>
