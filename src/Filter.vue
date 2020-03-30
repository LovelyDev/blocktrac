<template>
  <MainLayout section="filter">
    <b-container fluid id="filter">
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
          {{id}}
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout.vue'
import Authentication from './mixins/authentication'
import TxsSideBar     from './components/TxsSideBar.vue'

export default {
  name: 'Filters',

  mixins : [Authentication],

  components: {
    MainLayout,
    TxsSideBar,
  },

  props : {
    id : Number
  },
}
</script>

<style scoped>
</style>
