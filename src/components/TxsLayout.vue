<template>
  <MainLayout :section="section">
    <b-container fluid :id="section">
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
          <slot></slot>
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout from './MainLayout.vue'
import TxsSideBar from './TxsSideBar.vue'

export default {
  name: 'Txs',

  components: {
    MainLayout,
    TxsSideBar
  }
}
</script>
