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
        <b-list-group>
          <b-list-group-item v-for="tx in matched_tests"
                             :key="tx.transaction.hash"
                             class="tx_summary_container">

            <TxSummary :tx="tx" />
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import TxsLayout      from './components/TxsLayout.vue'
import FilterHeader   from './components/FilterHeader.vue'
import TxSummary      from './components/TxSummary.vue'

import util           from './util'

var jsonpath = require('./vendor/jsonpath')
jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

const captured_txs =
  require("./assets/captured_txs.json").reduce(function(ct, ctx){
    ct[ctx.replace(".json", "")] = Object.freeze(require("./assets/captured_txs/" + ctx))
    return ct;
  }, {});

export default {
  name: 'FilterTester',

  mixins : [Authentication, ServerAPI],

  components: {
    TxsLayout,
    FilterHeader,
    TxSummary
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
      var jp = util.filter_matcher(this.filter);

      Object.keys(captured_txs).forEach(function(ctx){
        const json = captured_txs[ctx];
        if(jsonpath.query(json, jp).length != 0)
          this.matched_tests.push(json);
      }.bind(this));
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
