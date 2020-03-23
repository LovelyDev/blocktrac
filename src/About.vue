<template>
  <MainLayout section="about">
    <div id="about">
      <h1>About</h1>

      <div id="content">
        <p>
          Zerp Tracker is a persistent transaction tracker for the XRP Blockchain. It allows you to monitor XRPL transactions in real time and setup alerts to be notified of ledger activity via any number of mechanisms (known as “sinks”). By leveraging filters using a rich and powerful pattern matching system, Zerp Tracker facilitates the inclusion (and/or exclusion) of the exact transactions that you are interested in!
        </p>

        <p>
          TODO
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import config     from './config'

export default {
  name: 'About',

  components: {
    MainLayout
  },

  methods : {
    pluralizer : function(num){
      return num == 1 ? '' : 's';
    }
  }
}
</script>

<style scoped>
#about{
  margin-bottom: 25px;
  padding: 25px;
}

#content{
  border: 1px solid #ededed;
  border-radius: 5px;
  padding: 50px;
  background-color: white;
}
</style>
