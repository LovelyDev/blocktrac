<template>
  <div>
    <b-row v-for="sink in all_sinks" :key="sink.id">
      <b-col cols="1" />

      <b-col>
        {{sink.type}}:
      </b-col>

      <b-col>
        {{sink.target}}
      </b-col>

      <b-col cols="1" class="align_end sink_control"
             v-b-modal="'delete_sink' + sink.id">
        <img src="../assets/minus.png" width="22px" />
      </b-col>

      <b-modal :id="'delete_sink' + sink.id" title="Delete Sink">
        <h3>Are you sure you want to delete sink:</h3>
        <h4><i>{{sink.target}}</i></h4>
        <h5>This action cannot be undone</h5>
      </b-modal>
    </b-row>
  </div>
</template>

<script>
var ServerLoader = require('../mixins/server_loader').default

export default {
  name: 'SinksList',

  mixins : [ServerLoader],

  data : function(){
    return {
       all_sinks : [],
    }
  },

  created : function(){
    this.load_sinks(function(sinks){
      sinks.forEach(function(sink){
        this.all_sinks.push(sink);
      }.bind(this));
    }.bind(this));
  }
}
</script>

<style scoped>
</style>
