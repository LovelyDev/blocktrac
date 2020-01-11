<template>
  <div id="tx_list_container">
    <div id="txs_header">
      <div>
        <b>Live Transactions</b>:
        <TxsControl />
      </div>
      <TxsFilter  />
    </div>

    <b-list-group>
      <b-list-group-item v-for="tx in txs"
                         :key="tx.transaction.hash"
                          class="tx_summary_container"
                         :class="tx.meta.TransactionResult">

        <TxSummary :tx="tx" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import TxSummary  from './TxSummary.vue'
import TxsFilter  from './TxsFilter.vue'
import TxsControl from './TxsControl.vue'

var CommandDispatcher = require('../mixins/command_dispatcher')

export default {
  name: 'TxsList',

  mixins : [CommandDispatcher],

  components : {
    TxSummary,
    TxsFilter,
    TxsControl,
  },

  computed : {
    loading_txs : function(){
      return this.$store.state.loading_txs;
    },

    txs : function(){
      return this.$store.state.txs;
    }
  },

  created : function(){
    this.msg_cb = function(message){
                    if(!message["transaction"]) return;
                    this.$store.commit('add_tx', message);
                  }.bind(this);

    this.$store.commit('on_socket_message', this.msg_cb);
    this.$store.commit('on_open_socket', function(){
      var cmd = {
        'command' : 'subscribe',
        'streams' : ['transactions']
      };

      this.sendCmd(cmd);
    }.bind(this));
  }
}
</script>

<style>
#tx_list_container{
  margin-top: 25px;
  padding: 5px;
  border: 1px solid black;
}

#txs_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.tx_summary_container{
  margin: 1px;
  background-color: red !important;
  color: white;
}

.tx_summary_container.tesSUCCESS{
  background-color: green !important;
}
</style>
