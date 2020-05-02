<template>
  <MainLayout :section="section">
    <div id="txs_layout">
      <div id="txs_header">
        <h2 id="txs_title">
          {{title}}
        </h2>

        <span v-if="live">
          <TxsControl />
        </span>
      </div>

      <div id="txs_content">
        <div id="txs_sidebar_container" v-if="mq_gt_md">
          <TxsSideBar />
        </div>

        <div id="txs_main_container">
          <slot></slot>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './MainLayout'
import TxsControl from './TxsControl'
import TxsSideBar from './TxsSideBar'

export default {
  name: 'Txs',

  components: {
    MainLayout,
    TxsControl,
    TxsSideBar
  },

  props : {
    section : {
      type : String,
      required : true
    }
  },

  computed : {
    live : function(){
      return this.section == 'txs';
    },

    title : function(){
      return this.live ? 'Live Transactions' :
                              'Transactions'
    }
  }
}
</script>

<style scoped>
#txs_layout{
  display: flex;
  flex-direction: column;
}

#txs_header{
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#txs_title{
  font-family: "Helvetica Bold";
  font-weight: bold;
  font-size: 5vw;
  margin-bottom: 0;
  margin-right: 10px;
}

#txs_content{
  display: flex;
}

#txs_sidebar_container{
  flex-basis: 22%;
}

#txs_main_container{
  flex-basis: 74%;
  margin-left: auto;
  overflow: auto;
}

#main_layout.md #txs_main_container,
#main_layout.sm #txs_main_container,
#main_layout.xs #txs_main_container{
  flex-basis: unset;
  width: 100%;
}
</style>
