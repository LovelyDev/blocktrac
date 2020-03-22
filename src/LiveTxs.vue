<template>
  <MainLayout section="live">
    <b-container fluid id="live">
      <b-row class="mt-3">
        <b-col>
          <h1>Live Transactions</h1>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col cols="2">
          <b-row>
            <b-col>
              <MyFilters />
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col>
              <AccountMonitor />
            </b-col>
          </b-row>
        </b-col>

        <b-col>
          <TxsList />
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout.vue'
import MyFilters      from './components/MyFilters.vue'
import AccountMonitor from './components/AccountMonitor.vue'
import TxsList        from './components/TxsList.vue'

export default {
  name: 'LiveTxs',

  components: {
    MainLayout,
    MyFilters,
    AccountMonitor,
    TxsList
  }
}
</script>
