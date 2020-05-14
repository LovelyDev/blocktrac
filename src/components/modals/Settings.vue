<template>
  <b-modal id="settings_modal"
           title="Filter Settings"
           ok-title="Save"
           ok-only
           @ok="save_settings"
           header-class="modal_header"
           size="lg">
    <BatchSettingsForm        ref="batch_settings"/>
    <NotificationSettingsForm ref="notification_settings"/>
    <SinksSettingsForm />
  </b-modal>
</template>

<script>
import BatchSettingsForm        from '../forms/BatchSettings'
import NotificationSettingsForm from '../forms/NotificationSettings'
import SinksSettingsForm        from '../forms/SinksSettings'
import Authentication           from '../../mixins/authentication'

import util from '../../util'

export default {
  name: 'SettingsModal',

  mixins : [Authentication],

  components : {
    BatchSettingsForm,
    NotificationSettingsForm,
    SinksSettingsForm
  },

  methods : {
    save_settings : function(){
      const params = {
        profile : {
          batch_size : this.$refs.batch_settings.$data.batch_size,
          notification_time : this.$refs.notification_settings.$data.notification_time
        }
      }

      this.$http.put(this.backend_url + "/user",
                      params, this.auth_header)
                .then(function(response){
                  this.load_user()

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not save settings: " + msg)
                }.bind(this))
    }
  }
}
</script>
