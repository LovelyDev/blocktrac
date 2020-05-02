<template>
  <div>
    <TxsFilter />
    <TxsFilterExample />

    <template v-if="mq_lte_md">
      <TxsFilterControls />

      <FilterListDropdown v-if="logged_in"
                          ref="my_filters" />

      <div v-if="!logged_in || remaining_filters > 0"
           id="create_filter"
           v-b-modal.create_filter>
        <span v-if="!logged_in">
          Create Personalized Filter
        </span>

        <span>
          + Add New Filter
        </span>
      </div>

      <CreateFilterModal @created="$refs.my_filters.load_filters()" />
    </template>

    <TxsCategoriesDropdown v-if="mq_lt_md" />

    <div id="txs_list">
      <TxsCategories v-if="mq_gte_md" />

      <b-list-group v-if="have_txs">
        <b-list-group-item v-for="tx in txs"
                           :key="tx.transaction.hash"
                           class="tx_summary_container">
          <TxSummary :tx="tx" />
        </b-list-group-item>
      </b-list-group>

      <div class="text-center m-3" v-else>
        <b-spinner />
      </div>
    </div>
  </div>
</template>

<script>
import TxsFilter             from './TxsFilter'
import TxsFilterExample      from './TxsFilterExample'
import TxsFilterControls     from './TxsFilterControls'
import TxsCategories         from './TxsCategories'
import TxsCategoriesDropdown from './TxsCategoriesDropdown'
import TxSummary             from './TxSummary'
import FilterListDropdown    from './FilterListDropdown'
import CreateFilterModal     from './modals/CreateFilter'

import Authentication        from '../mixins/authentication'
import CommandDispatcher     from '../mixins/command_dispatcher'
import HasFilters            from '../mixins/has_filters'

export default {
  name: 'TxsList',

  mixins : [Authentication, CommandDispatcher, HasFilters],

  components : {
    TxsFilter,
    TxsFilterExample,
    TxsFilterControls,
    TxsCategories,
    TxsCategoriesDropdown,
    TxSummary,
    FilterListDropdown,
    CreateFilterModal
  },

  computed : {
    loading_txs : function(){
      return this.$store.state.loading_txs;
    },

    txs : function(){
      return this.$store.state.txs;
    },

    have_txs : function(){
      return this.txs.length != 0;
    }
  },

  methods : {
    msg_cb : function(message){
      if(!message["transaction"]) return;
      this.$store.commit('add_tx', message);
    }
  },

  created : function(){
    this.$store.commit('on_socket_message', this.msg_cb);
    this.$store.commit('on_open_socket', function(){
      var cmd = {
        'command' : 'subscribe',
        'streams' : ['transactions']
      };

      this.sendCmd(cmd);
    }.bind(this));
  },

  destroyed : function(){
    this.$store.commit('rm_socket_message_cb', this.msg_cb);

    var cmd = {
      'command' : 'unsubscribe',
      'streams' : ['transactions']
    };

    this.sendCmd(cmd);
  }
}
</script>

<style scoped>
#txs_list{
  border: 1px solid #f5f5f6;
  background-color: white;
}

#create_filter{
  background-color: var(--theme-color1);
  color: white;
  border-radius: 5px;
  margin-top: 5px;
  padding: 3px;
  cursor: pointer;
  text-align: center;
}

.tx_summary_container{
  padding: 0px;
}

.tx_summary_container:first-child{
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
