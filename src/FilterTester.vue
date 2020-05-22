<!--
  * Filter Tester Page
  * Renders test transactions for a single filter, specified by ID.
  * Test transactions are precaptured live-transactions which serve
  * as a static database to test filters against.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="filter_tester">
    <div id="filter_tester">
      <FilterHeader />

      <div v-if="matched_tests.length == 0" id="no_matches">
        <img id="no_matches_icon"
             src="./assets/yellow-alert.svg" />

        <div>No test transactions match</div>

        <div>It might be incorrect filter composition</div>

        <div id="change_parameters">
          Change the filter parameters to get results
        </div>

        <div id="duplicate_link"
             v-b-modal.duplicate_filter>
          <img id="duplicate_link_icon"
               src="./assets/duplicate.svg">
          <span>Duplicate and edit</span>
        </div>
      </div>

      <div v-else>
        <b-list-group>
          <b-list-group-item id="filter_test_explanation">
            <img src="./assets/info.svg" />
            <span>The following are pre-captured transactions that your filter matches.
            If this is not what you expect, edit your filter.</span>
          </b-list-group-item>

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

import TxsLayout      from './components/TxsLayout'
import FilterHeader   from './components/FilterHeader'
import TxSummary      from './components/TxSummary'

import util           from './util'
import config         from './config'

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
    active_filter : function(){
      var jp = util.filter_matcher(this.active_filter);

      Object.keys(captured_txs).forEach(function(ctx){
        const json = captured_txs[ctx];
        if(jsonpath.query(json, jp).length != 0)
          this.matched_tests.push(json);
      }.bind(this));
    }
  },

  created : function(){
    if(config.MAINTENANCE_MODE){
      this.$router.push({path : '/maintenance'});
      return;
    }

    this.load_filter(this.id)
  }
}
</script>

<style scoped>
#filter_tester{
  background-color: white;
  height: 100%;

  display: flex;
  flex-direction: column;
}

#no_matches{
  padding: 25px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#no_matches_icon{
  margin-bottom: 25px;
}

#change_parameters{
  font-size:0.8rem;
  margin-top: 30px;
  font-family: var(--theme-font4);
}

#duplicate_link{
  padding: 5px 65px;
  margin-top: 5px;

  border-radius: 15px;
  color: white;
  background-color: var(--theme-color1);

  display: flex;
  cursor: pointer;
}

#duplicate_link_icon{
  margin-right: 10px;
}

#filter_test_explanation{
  display: flex;
  align-items: center;
}

#main_layout.sm #filter_test_explanation,
#main_layout.xs #filter_test_explanation{
  padding: 10px;
}

#filter_test_explanation span{
  opacity: 0.6;
  font-size: 0.9rem;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
}

#filter_test_explanation img{
  margin-right: 5px;
  min-width: 20px;
}

.tx_summary_container{
  padding: 0px;
}
</style>
