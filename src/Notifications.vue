<!--
  * Notifications List Page
  * Renders a list of notifications sent to the user
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="notifications">
    <b-list-group>
      <b-list-group-item>
        <div id="filter_header">
          Filter
        </div>

        <div id="target_header">
          Target
        </div>

        <div id="transactions_header">
          Transactions
        </div>
      </b-list-group-item>

      <b-list-group-item v-for="notification in notifications"
                         :key="notification.id"
                         class="notification">
        <router-link :path="'/notification/' + notification.id">
          <div class="filter">
            {{notification.Filter.name}}
          </div>

          <div class="target">
            {{notification.Sink.type}}: {{notification.Sink.target}}
          </div>

          <div class="transactions">
            {{notification.MatchedTransactions.length}}
          </div>
        </router-link>
      </b-list-group-item>
    </b-list-group>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import config from './config'

export default {
  name: 'Notifications',

  mixins : [Authentication, ServerAPI],

  created : function(){
    if(config.MAINTENANCE_MODE){
      this.$router.push({path : '/maintenance'});
      return;
    }

    this.load_notifications()
  }
}
</script>

<style scoped>
.notification a{
  display: flex;
}
</style>
