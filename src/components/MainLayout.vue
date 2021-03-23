<!--
  * Main Site Layout
  * Top level encapsulation component, rendered on all pages.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container fluid
               id="main_layout"
               class="p-0"
               :class="$mq">
    <ConnectionStatus />

    <b-row id="main_header_container">
      <b-col class="p-0">
        <MainHeader />
      </b-col>
    </b-row>

    <b-row no-gutters id="main_content" :class="section">
      <b-col>
        <div id="main_subcontent" :class="section">
          <slot></slot>
        </div>
      </b-col>
    </b-row>

    <MainFooter />
  </b-container>
</template>

<script>
import MainHeader       from './MainHeader'
import MainFooter       from './MainFooter'
import ConnectionStatus from './ConnectionStatus'

import Authentication   from '../mixins/authentication'
import Blockchain       from '../mixins/blockchain'
import Network          from '../mixins/network'

import network_config   from '../network-config'

export default {
  name: 'MainLayout',

  mixins : [Authentication, Blockchain, Network],

  components : {
    MainHeader,
    MainFooter,
    ConnectionStatus
  },

  props : {
    section : {
      type : String,
      required : true
    }
  },

  created : function(){
    if(this.no_blockchain_configured)
      this.$store.commit('set_selected_blockchain', network_config.DEFAULT_BLOCKCHAIN)

    // Initialize and connect to network
    this.network_init();
    this.network.connect();

    // If logged in, always load user to
    // verify user session is still active
    if(this.auth_token)
      this.load_user();
  }
}
</script>

<style scoped>
#main_layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}

#main_header_container{
  width: 100%;
}

#main_content{
  width: 100%;
  flex-grow: 1;
  padding-bottom: 10px;
  background-color: #f8f8f9;
  border-top: 1px solid var(--theme-color3);
}

#main_subcontent{
  width: 90%;
  margin: auto;
}

/* XXX: hacks for landing page */

#main_content.landing{
  padding-bottom: 0;
  margin-bottom: 10px;
}

#main_subcontent.landing{
  width: unset;
}
</style>
