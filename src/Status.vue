<!--
  * Status Page
  * Renders application status
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="status">
    <h1>Server Status</h1>

    <b-container v-if="have_server_status"
                 id="status_container">
      <b-row>
        <b-col>
          Users: {{server_status.users}}
        </b-col>

        <b-col>
          Filters: {{server_status.filters}}
        </b-col>

        <b-col>
          Sinks: {{server_status.sinks}}
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import MainLayout     from './components/MainLayout'

export default {
  name: "Status",

  mixins : [Authentication, ServerAPI],

  components: {
    MainLayout
  },

  computed : {
    have_server_status : function(){
      return Object.keys(this.server_status).length > 0;
    }
  },

  created : function(){
    this.load_server_status();
    // ... periodically retrieve app status
  }
}
</script>

<style scoped>
#status_container{
  text-align: center;
}
</style>
