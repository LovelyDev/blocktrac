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

      <b-modal :id="'delete_sink' + sink.id"
               title="Delete Sink"
               @ok="delete_sink(sink.id)">
        <h3>Are you sure you want to delete sink:</h3>
        <h4><i>{{sink.target}}</i></h4>
        <h5>This action cannot be undone</h5>
      </b-modal>
    </b-row>
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'SinksList',

  mixins : [Authentication],

  data : function(){
    return {
       all_sinks : [],
    }
  },

  methods : {
    load_sinks : function(){
      this.all_sinks = [];

      this.$http.get(this.backend_url + "/sinks", this.auth_header)
                .then(function(response){
                    response.body.forEach(function(sink){
                      this.all_sinks.push(sink)
                    }.bind(this));
                }.bind(this))
    },

    delete_sink : function(sink_id){
      this.$http.delete(this.backend_url + "/sink/" + sink_id, this.auth_header)
                .then(function(response){
                  this.load_sinks();

                }.bind(this)).catch(function(err){
                  alert("Problem deleting sink: " + err.body.error)
                })
    }
  },

  created : function(){
    this.load_sinks();
  }
}
</script>
