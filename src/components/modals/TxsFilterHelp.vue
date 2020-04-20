<template>
  <b-modal id="txs_filter_help"
           title="JSONPath Help"
           size="lg"
           ok-only>
    <FilterHelp @set="set_filter"/>
  </b-modal>
</template>

<script>
import FilterHelp from '../FilterHelp.vue'

export default {
  name: 'TxsFilterHelpModal',

  components : {
    FilterHelp
  },

  methods : {
    set_filter : function(filter){
      this.$store.commit('update_tx_filter', filter);
    }
  }
}
</script>
