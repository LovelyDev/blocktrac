<template>
  <div id="txs_filter">
    <span id="icon1">🔍</span>

    <b-form-input v-model="filter"
                  placeholder="JSONPath Expression..." />

    <span id="icon2" v-b-modal.filter_help>(?)</span>

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
#txs_filter{
  position: relative;
}

input {
  width: 100%;
  padding-left: 50px;
}

#icon1{
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 1.2rem;
}

#icon2{
  position: absolute;
  top: 3px;
  right: 10px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
