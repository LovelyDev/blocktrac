<template>
  <MainLayout section="live">
    <TxsList />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import TxsList    from './components/TxsList.vue'

export default {
  name: 'LiveTxs',

  components: {
    MainLayout,
    TxsList
  }
}
</script>
