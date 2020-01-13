<template>
  <MainLayout section="Filters">
    <div id="filters_container">
      <div id="filters_header">
        <h1>Filters</h1>

        <div id="create_filter_control" v-b-modal.create_filter>
          <img src="./assets/plus.png" width="22px" />
        </div>

        <b-modal id="create_filter" title="Create New Filter">
          <CreateEditFilter />
        </b-modal>
      </div>

      <div>
        <FilterSummary v-for="filter in filters" :key="filter.id" :filter="filter" />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout       from './components/MainLayout.vue'
import FilterSummary    from './components/FilterSummary.vue'
import CreateEditFilter from './components/CreateEditFilter.vue'

var ServerLoader = require('./mixins/server_loader').default

export default {
  name: 'Filters',

  mixins : [ServerLoader],

  components: {
    MainLayout,
    FilterSummary,
    CreateEditFilter
  },

  data : function(){
    return {
      filters : []
    };
  },

  created : function(){
    this.load_filters(function(filters){
      filters.forEach(function(f){
        this.filters.push(f);
      }.bind(this))
    }.bind(this));
  }
}
</script>

<style scoped>
#filters_container{
  min-height: 100%;
  width: 85%;
  margin: auto;
  padding: 15px;
  border: 1px solid black;
}

#filters_header{
  display: flex;
  justify-content: space-between;
}

#create_filter_control:hover{
cursor: pointer;
}
</style>
