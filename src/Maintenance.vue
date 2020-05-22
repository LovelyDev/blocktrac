<!--
  * Maintenance Page
  * Displayed whenever the maintenance flag is set true in the config
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="maintenance">
    <div id="maintenance_container">
      <h2>We are currently undergoing maintenance</h2>
      <img src="./assets/currencies/XRP.svg" width="30%" />
      <h3>Please check back later</h3>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

import config     from './config'

export default {
  name: 'Maintenance',

  components: {
    MainLayout
  },

  created : function(){
    if(!config.MAINTENANCE_MODE)
      this.$router.push({path : '/txs'});
  }
}
</script>

<style scoped>
#maintenance_container{
  margin: 50px;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  font-family: var(--theme-font1);
  background-color: #EEEEEE;
  border-radius: 15px;
}

#maintenance_container img{
  margin: 25px;
}
</style>
