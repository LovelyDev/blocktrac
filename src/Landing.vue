<template>
  <MainLayout section="landing">
    <TxsList />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import TxsList    from './components/TxsList.vue'

export default {
  name: 'Landing',

  components: {
    MainLayout,
    TxsList
  }
}
</script>

<style>
</style>
