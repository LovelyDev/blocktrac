<template>
  <b-modal id="create_sink"
        title="Create Sink"
          @ok="create_sink">
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
        <td><b-form-input type="text"
                  :placeholder="sink_type"
                       v-model="target" /></td>
      </tr>
    </table>
  </b-modal>
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'SinkForm',

  mixins : [Authentication],

  data : function(){
    return {
      sink_type : '',
         target : null
    }
  },

  computed : {
    sms_enabled : function(){
      return this.$store.state.sms_enabled;
    },

    webhook_enabled : function(){
      return this.$store.state.webhook_enabled;
    }
  },

  methods : {
    create_sink : function(){
      const sink_params = {
        type : this.sink_type,
        target: this.target
      };

      this.$http.post(this.backend_url + "/sink",
                      sink_params, this.auth_header)
                .then(function(response){
                  this.$emit('created')

                }.bind(this)).catch(function(err){
                  alert("Could not create sink: " + err.body.error)
                }.bind(this))
    }
  }
}
</script>
