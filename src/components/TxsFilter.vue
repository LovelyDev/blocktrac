<template>
  <div id="txs_filter">
    <span id="txs_filter_icon">
      <span class="text">{</span>
      <img src="../assets/search.svg" />
      <span class="text">}</span>
    </span>

    <input v-model="filter"
           placeholder="JSONPath Expression..." />

    <div id="txs_filter_controls">
      <b-button id="txs_filter_clear"
                :disabled="!filter"
                @click="filter = ''">
        <img src="../assets/x-black.svg" />
        <span>Clear</span>
      </b-button>

      <b-button id="txs_filter_save"
                :disabled="!filter"
                v-b-modal.save_filter>
        <img src="../assets/down-triangle-lines-plus.svg" />
        <span>Save to filter</span>
      </b-button>
    </div>

    <SaveFilterModal @created="load_filters"
                      :filter="save_filter" />
  </div>
</template>

<script>
import Authentication  from '../mixins/authentication'
import ServerAPI       from '../mixins/server_api'
import SaveFilterModal from './modals/SaveFilter.vue'

export default {
  name: 'TxFilter',

  mixins : [Authentication, ServerAPI],

  components : {
    SaveFilterModal
  },

  computed : {
    filter : {
      get : function(){
        return this.$store.state.tx_filter;
      },

      set : function(v){
        this.$store.commit('update_tx_filter', v);
      }
    },

    save_filter : function(){
      return {jsonpath : this.filter};
    }
  }
}
</script>

<style scoped>
#txs_filter{
  position: relative;
}

input {
  width: 100%;
  padding-left: 55px;
  padding-top: 10px;
  padding-bottom: 7px;
  color: var(--theme-color4);
}

#txs_filter_icon{
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 1.2rem;
}

#txs_filter_icon img{
  padding-left: 3px;
  padding-right: 3px;
}

#txs_filter_icon .text{
  color: var(--theme-color4);
  opacity: 0.3;
}

#txs_filter_controls{
  position: absolute;
  top: 5px;
  right: 5px;
  height: 75%;
}

#txs_filter_save,
#txs_filter_clear{
  height: 100%;
  padding: 0 5px;
}

#txs_filter_save{
  background-color: var(--theme-color5);
}

#txs_filter_clear{
  background-color: var(--theme-color3);
  color: black;
  margin-right: 5px;
  padding: 0px 20px;
}

#txs_filter_save img,
#txs_filter_clear img{
  margin-right: 5px;
}
</style>
