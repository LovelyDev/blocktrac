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
export default {
  name: 'SinkForm',

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
      // ...
    }
  }
}
</script>
