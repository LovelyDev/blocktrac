<template>
  <div id="txs_filter_example">
    <div id="txs_filter_example_label">
      Example:
    </div>

    <div id="txs_filter_example_jsonpath"
          @click="set_filter(example)">
      {{example}}
    </div>

    <div id="txs_filter_example_icon" v-b-modal.txs_filter_help>
      <img src="../assets/question.svg" />
    </div>

    <FilterHelpModal />
  </div>
</template>

<script>
import FilterHelpModal from './modals/TxsFilterHelp.vue'

export default {
  name: 'TxFilterExample',

  components : {
    FilterHelpModal
  },

  data : function(){
    return {
      example : '$..[?(parseInt(@.Amount) > 500000000)]'
    };
  },

  methods : {
    set_filter : function(filter){
      this.$store.commit('update_tx_filter', filter);
    }
  }
}
</script>

<style scoped>
#txs_filter_example{
  margin-top: 15px;
  margin-bottom: 15px;
  font-family: var(--theme-font1);
  display: flex;
  align-items: center;
}

#txs_filter_example_label{
  color: var(--theme-color4);
  margin-right: 5px;
  margin-top: 3px;
  opacity: 0.7;
}

#txs_filter_example_jsonpath{
  color: var(--theme-color1);
  margin-right: 5px;
  margin-top: 3px;
  cursor: pointer;
}

#txs_filter_example_icon{
  cursor: pointer;
}
</style>
