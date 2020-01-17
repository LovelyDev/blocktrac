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

        <b-col class="align_end">
          <b-form-checkbox id="instant_notification"
                      v-model="instant" />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h2>Sinks:</h2>
        </b-col>

        <b-col v-if="multiple_sinks"
              class="align_end sink_control"
              v-b-modal.create_sink>
          <img src="./assets/plus.png" width="22px" />
        </b-col>

        <b-modal id="create_sink" title="Create Sink">
          <table>
            <tr>
              <td>Type:</td>
              <td>
                <select v-model="sink_type">
                  <option value="email">
                    Email
                  </option>

                  <option v-if="sms_enabled" value="sms">
                    SMS
                  </option>

                  <option v-if="webhook_enabled" value="webhook">
                    URL
                  </option>
                </select>
              </td>
            </tr>

            <tr>
              <td></td>
              <td><b-form-input type="text" :placeholder="sink_type" /></td>
            </tr>
          </table>
        </b-modal>
      </b-row>

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
          <img src="./assets/minus.png" width="22px" />
        </b-col>

        <b-modal :id="'delete_sink' + sink.id" title="Delete Sink">
          <h3>Are you sure you want to delete sink:</h3>
          <h4><i>{{sink.target}}</i></h4>
          <h5>This action cannot be undone</h5>
        </b-modal>
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
         instant : false,
       sink_type : ''
    }
  },

  computed : {
    instant_supported : function(){
      return this.$store.state.instant_supported;
    },

    multiple_sinks : function(){
      return this.$store.state.multiple_sinks;
    },

    sms_enabled : function(){
      return this.$store.state.sms_enabled;
    },

    webhook_enabled : function(){
      return this.$store.state.webhook_enabled;
    },
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
.align_end{
  text-align: end;
}

.sink_control{
  cursor: pointer;
  margin-right: 5px;
}
</style>
