<template>
  <TxsLayout section="txs">
    <TxsList />
  </TxsLayout>
</template>

<script>
import TxsLayout from './components/TxsLayout.vue'
import TxsList   from './components/TxsList.vue'

export default {
  name: 'Txs',

  components: {
    TxsLayout,
    TxsList
  }
}
</script>
