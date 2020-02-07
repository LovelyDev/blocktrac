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

        <SinkForm @created="$refs.sinks_list.load_sinks()" />
      </b-row>

      <b-row>
        <b-col>
          <SinksList ref="sinks_list" />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button type="submit"
                   @click="update_profile">
            Submit
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout.vue'
import SinkForm       from './components/SinkForm.vue'
import SinksList      from './components/SinksList.vue'
import Authentication from './mixins/authentication'

export default {
  name: 'Profile',

  mixins : [Authentication],

  components: {
    MainLayout,
    SinkForm,
    SinksList
  },

  data : function(){
    return {
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
    },
  },

  methods : {
    load_profile : function(){
      this.$http.get(this.backend_url + "/user", this.auth_header)
                .then(function(response){
                  var profile = JSON.parse(response.body.profile);
                  if(profile.batch_size)
                    this.batch_size = profile.batch_size;
                  if(profile.instant)
                    this.instance = profile.instant;

                }.bind(this)).catch(function(err){
                  alert("Problem loading profile: " + err.body.error)
                }.bind(this))
    },

    update_profile : function(){
      const user_params = {batch_size : this.batch_size,
                              instant : this.instant}

      this.$http.put(this.backend_url + "/profile",
                     user_params, this.auth_header)
                .then(function(response){
                  this.load_profile();

                }.bind(this)).catch(function(err){
                  alert("Problem updating profile: " + err.body.error)
                }.bind(this))
    }
  },

  created : function(){
    this.load_profile()
  }
}
</script>
