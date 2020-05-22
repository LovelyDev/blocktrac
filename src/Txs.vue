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

import config    from './config'

export default {
  name: 'Txs',

  components: {
    TxsLayout,
    TxsList
  },

  created : function(){
    if(config.MAINTENANCE_MODE){
      this.$router.push({path : '/maintenance'});
      return;
    }
  }
}
</script>
