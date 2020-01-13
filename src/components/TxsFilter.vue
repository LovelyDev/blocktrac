<template>
  <div id="txs_filter">
    <span v-b-modal.filter_help><sup>Help</sup></span>
    <b-form-input v-model="filter"
                  placeholder="JSONPath Expression..." />

    <b-modal id="filter_help" title="JSONPath Help" ok-only>
      <FilterHelp @set="set_filter"/>
    </b-modal>
  </div>
</template>

<script>
import FilterHelp from './FilterHelp.vue'

export default {
  name: 'TxFilter',

  components : {
    FilterHelp
  },

  computed : {
    filter : {
      get : function(){
        return this.$store.state.tx_filter;
      },

      set : function(v){
        this.$store.commit('update_tx_filter', v);
      }
    }
  },

  methods : {
    set_filter : function(filter){
      this.filter = filter;
    }
  },
}
</script>

<style scoped>
#txs_filter {
  text-align: right;
  margin-right: 5px;
  color: blue;
  cursor: pointer;
}

input {
  display: inline-block;
  font-size: 0.75em;
  width: 250px;
  margin-left: 5px;
}

input.sm{
  font-size: 0.45em;
}
</style>
