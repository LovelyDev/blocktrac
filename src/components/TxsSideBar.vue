<template>
  <b-container>
    <b-row v-if="logged_in"
           id="live_nav"
           :class="{active : on_txs_page}">
      <b-col class="p-0">
        <router-link to="/txs">
          <div>
            <span id="live_leader">Live</span>
            <span>All Transactions</span>
          </div>
          <div>&gt;</div>
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <MyFilters />
      </b-col>
    </b-row>

    <b-row class="mt-4" v-if="!logged_in">
      <b-col>
        <AccountMonitor />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyFilters      from './MyFilters.vue'
import AccountMonitor from './AccountMonitor.vue'

import Authentication from '../mixins/authentication'

export default {
  name: 'TxsSideBar',

  mixins : [Authentication],

  components: {
    MyFilters,
    AccountMonitor,
  },

  computed : {
    on_txs_page : function(){
      return this.$route.path == "/txs";
    }
  }
}
</script>

<style scoped>
#live_nav{
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;

  text-align: center;
  font-weight: bold;
  border-radius: 3px;
}

#live_nav a{
  color: #a3b1c5;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
}

#live_nav #live_leader{
  background-color: #a3b1c5;
  color: white;
  padding: 5px;
  margin-right: 10px;
  border-radius: 10px;
}

#live_nav.active{
  background-color: #e9edf4;
  color: #415166;
}

#live_nav.active a{
  color: black;
}

#live_nav.active #live_leader{
  background-color: black;
}
</style>
