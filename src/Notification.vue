<!--
  * Notification Details Page
  * Renders a details about a particular notification sent to the user
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="notification">
    <div>{{notification.Filter.name}}</div>
    <div>{{notification.Sink.type}}: {{notification.Sink.target}}</div>

    <b-list-group>
      <b-list-group-item v-for="tx in notification.MatchedTransactions"
                         :key="tx.transaction.hash">
        <TxSummary :tx="tx" />
      </b-list-group-item>
    </b-list-group>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import TxSummary      from './components/TxSummary'

import config from './config'

export default {
  name: 'Notification',

  mixins : [Authentication, ServerAPI],

  compontents : {TxSummary},

  props : {
    id : Number
  },

  data : function(){
    return {
      notification : {
        Filter : {},
          Sink : {},
        MatchedTransactions : []
      }
    }
  },

  created : function(){
    if(config.MAINTENANCE_MODE){
      this.$router.push({path : '/maintenance'});
      return;
    }

    this.load_notification()
        .then(function(notification){
          this.notification = notification

          this.notification.MatchedTransactions.forEach(function(tx, t){
            this.notification.MatchedTransactions[t] = JSON.parse(tx.raw)
          }.bind(this))

        }.bind(this)).catch(function(err){
          // ...
        })
  }

}
</script>

<style scoped>
</style>
