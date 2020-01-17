<template>
  <MainLayout section="profile">
    <b-container>
      <b-row>
        <b-col>
          <h1>Profile:</h1>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label for="batch_size">Batch: <b>{{batch_size}}</b></label>
        </b-col>

        <b-col cols="10">
          <b-form-input id="batch_size"
                   v-model="batch_size"
                      type="range"
                      min="5"
                      max="10" />
        </b-col>
      </b-row>

      <b-row v-if="instant_supported">
        <b-col>
          <label form="instant_notification">Instant</label>
        </b-col>

        <b-col>
          <b-form-checkbox id="instant_notification"
                      v-model="instant" />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h2>Sinks:</h2>
        </b-col>

        <b-col v-if="multiple_sinks">
          <img src="./assets/plus.png" width="22px" />
        </b-col>
      </b-row>

      <b-row v-for="sink in all_sinks" :key="sink.id">
        <b-col cols="1" />

        <b-col>
          {{sink.type}}:
        </b-col>

        <b-col>
          {{sink.target}}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button type="submit">Submit</b-button>
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'

var ServerLoader = require('./mixins/server_loader').default

export default {
  name: 'Profile',

  mixins : [ServerLoader],

  components: {
    MainLayout
  },

  data : function(){
    return {
       all_sinks : [],

      batch_size : 10,
         instant : false
    }
  },

  computed : {
    instant_supported : function(){
      return this.$store.state.instant_supported;
    },

    multiple_sinks : function(){
      return this.$store.state.multiple_sinks;
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
