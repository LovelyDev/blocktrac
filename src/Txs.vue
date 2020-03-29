<template>
  <MainLayout section="txs">
    <b-container fluid id="txs">
      <b-row class="mt-3">
        <b-col>
          <h1>Transactions</h1>
        </b-col>
      </b-row>

      <b-row class="mt-3 flex-nowrap">
        <b-col cols="3">
          <TxsSideBar />
        </b-col>

        <b-col>
          <TxsList />
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import TxsSideBar from './components/TxsSideBar.vue'
import TxsList    from './components/TxsList.vue'

export default {
  name: 'Txs',

  components: {
    MainLayout,
    TxsSideBar,
    TxsList
  }
}
</script>

<style scoped>
</style>
