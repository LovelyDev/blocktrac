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
          <u>{{date_str}}</u>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="card">
          Users: {{server_status.users | delim}}
        </b-col>

        <b-col class="card">
          Filters: {{server_status.filters | delim}}
        </b-col>

        <b-col class="card">
          Sinks: {{server_status.sinks | delim}}
        </b-col>

        <b-col class="card">
          Filter Sinks: {{server_status.filter_sinks | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col class="card">
          Transactions: {{server_status.txs | delim}}
        </b-col>

        <b-col class="card">
          Not processed: {{server_status.txs_to_process | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col class="card">
          Filter Matches: {{server_status.filter_matches | delim}}
        </b-col>

        <b-col class="card">
          Not Notified: {{server_status.non_notified_filter_matches | delim}}
        </b-col>

        <b-col class="card">
          Notifications: {{server_status.notifications | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Benchmarks</h3>
          <b-list-group>
            <b-list-group-item v-for="benchmark in benchmarks"
                                :key="benchmark">
              {{benchmark}}: {{benchmark_str(meta[benchmark])}}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Meta</h3>
          <b-list-group>
            <b-list-group-item v-for="ometa in other_meta"
                                :key="ometa">
              {{ometa}}: {{meta[ometa]}}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Transactions being processed</h3>
          {{txs_being_processed_str}}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Filters being notified</h3>
          {{filters_being_notified_str}}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Filters exceeding batch size</h3>
          {{filters_exceeding_batch_size_str}}
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import MainLayout     from './components/MainLayout'

import config         from './config/config'

export default {
  name: "Status",

  mixins : [Authentication, ServerAPI],

  components: {
    MainLayout
  },

  computed : {
    date_str : function(){
      return (new Date()).toGMTString();
    },

    have_server_status : function(){
      return Object.keys(this.server_status).length > 0;
    },

    meta : function(){
      return this.server_status.meta;
    },

    meta_keys : function(){
      return Object.keys(this.meta);
    },

    benchmarks : function(){
      return this.meta_keys.filter(function(m){
        return m.match(/.*benchmark/);
      })
    },

    other_meta : function(){
      return this.meta_keys.filter(function(m){
        return !m.match(/.*benchmark/);
      })
    },

    txs_being_processed_str : function(){
      return this.server_status
                 .txs_being_processed
                 .join(", ");
    },

    filters_being_notified_str : function(){
      return this.server_status
                 .filters_being_notified
                 .join(", ");
    },

    filters_exceeding_batch_size_str : function(){
      return this.server_status
                 .filters_violating_batch_sizes
                 .map(function(f) {
                   return f.id + "(" + f.num + ")"
                 }).join(", ")
    }
  },

  methods : {
    benchmark_str : function(benchmark){
      const json = JSON.parse(benchmark);

      var value_str = "Started: " + json.started +
                    ", Updated: " + json.updated;

      if(json.total)
        value_str += ", Total " + json.total;

      if(json.avg)
        value_str += ", Average " + json.avg;

      return value_str;
    }
  },

  created : function(){
    this.load_server_status();

    this.refresh = setInterval(function(){
      this.load_server_status();
    }.bind(this), config.STATUS_REFRESH)
  },

  destroyed : function(){
    clearInterval(this.refresh)
  }
}
</script>

<style scoped>
#status_container{
  text-align: center;
}

#status_container .col{
  padding: 15px;
  margin: 5px;
}

#status_container .card{
  border: 1px solid var(--theme-color1);
  border-radius: 5px;
}
</style>
