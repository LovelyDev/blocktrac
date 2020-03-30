<template>
  <TxsLayout section="filter">
    <div id="filter_details">
      <FilterHeader :filter="filter" />

      <div v-if="matched_txs.length == 0" id="no_matches">
        <img src="./assets/bell.png" width="75px"/>

        <div>No matches at the moment</div>

        <div>You will get notifications <!-- TODO sinks --></div>

        <div style="font-size:0.7rem; margin-top: 10px;">
          Check your filter for proper composition
        </div>

        <router-link :to="'/test/' + id">
          <div id="test_link">⚙ Test filter</div>
        </router-link>
      </div>

      <div v-else>
        <!-- TODO render matched transactions -->
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
  name: 'FilterDetails',

  mixins : [Authentication, ServerAPI],

  components: {
    TxsLayout,
    FilterHeader
  },

  props : {
    id : Number
  },

  watch : {
    // XXX: need to watch route incase switching between filters
    $route : function(){
      this.load_filter(this.id)
      this.load_match_txs(this.id)
    }
  },

  created : function(){
    this.load_filter(this.id)
    this.load_matched_txs(this.id)
  }
}
</script>

<style scoped>
#filter_details{
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

#test_link{
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 5px;

  border-radius: 15px;
  background-color: #415166;
  color: white;
}
</style>
