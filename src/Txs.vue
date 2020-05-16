<!--
  * Txs Page
  * Encapsulates the TxsList component
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="txs">
    <TxsList />
  </TxsLayout>
</template>

<script>
import TxsLayout from './components/TxsLayout'
import TxsList   from './components/TxsList'

export default {
  name: 'Txs',

  components: {
    TxsLayout,
    TxsList
  }
}
</script>
