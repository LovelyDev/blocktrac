<template>
  <MainLayout section="Filters">
    <div id="filters_container">
      <div id="filters_header">
        <div id="create_filter_control" v-b-modal.create_filter>
          <img src="./assets/plus.png" width="22px" />
        </div>

        <b-modal id="create_filter" title="Create New Filter">
          Create Filter
        </b-modal>
      </div>

      <h1>Filters</h1>

      <div>
        <FilterSummary v-for="filter in filters" :key="filter.id" :filter="filter" />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout    from './components/MainLayout.vue'
import FilterSummary from './components/FilterSummary.vue'

// TODO remove once filters are retrieved from server
import filters from './assets/stub-filters.json'

export default {
  name: 'Filters',
  components: {
    MainLayout,
    FilterSummary
  },

  data : function(){
    return {
      filters : []
    };
  },

  created : function(){
    // TODO: actually get filters from server
    filters.forEach(function(f){
      this.filters.push(f);
    }.bind(this))
  }
}
</script>

<style>
#filters_container{
  min-height: 100%;
  width: 85%;
  margin: auto;
  padding: 15px;
  border: 1px solid black;
}

#filters_header{
  display: flex;
  justify-content: flex-end;
}

#create_filter_control:hover{
cursor: pointer;
}
</style>
