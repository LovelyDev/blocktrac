<template>
  <TxsLayout section="filter_tester">
    <div id="filter_tester">
      <FilterHeader :filter="filter" />

      <div v-if="matched_tests.length == 0" id="no_matches">
        <!-- TODO report test results -->
        <img src="./assets/warn.png" width="75px"/>

        <div>No test transactions match</div>

        <div>It might be incorrect filter composition</div>

        <div style="font-size:0.7rem; margin-top: 10px;">
          Change the filter parameters to get results
        </div>

        <div id="duplicate_link">⎘ Duplicate and edit</div>
      </div>

      <div v-else>
        <!-- TODO render matched tests -->
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import TxsLayout      from './components/TxsLayout.vue'
import FilterHeader   from './components/FilterHeader.vue'

export default {
  name: 'FilterTester',

  mixins : [Authentication, ServerAPI],

  components: {
    TxsLayout,
    FilterHeader
  },

  props : {
    id : Number
  },

  data : function(){
    return {
      matched_tests : []
    }
  },

  watch : {
    filter : function(){
      // TODO run filter against tests
    }
  },

  created : function(){
    this.load_filter(this.id)
  }
}
</script>

<style scoped>
#filter_tester{
  background-color: white;
  min-height: 100%;
}

#no_matches{
  padding: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

#no_matches img{
  margin-bottom: 25px;
}

#duplicate_link{
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 5px;

  border-radius: 15px;
  background-color: #415166;
  color: white;

  cursor: pointer;
}
</style>
