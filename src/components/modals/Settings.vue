<template>
  <b-modal id="settings_modal"
           title="Filter Settings"
           ok-title="Save"
           ok-only
           header-class="modal_header"
           size="lg">
    <BatchSettingsForm />
    <NotificationSettingsForm />
    <SinksSettingsForm />
  </b-modal>
</template>

<script>
import BatchSettingsForm        from '../forms/BatchSettings'
import NotificationSettingsForm from '../forms/NotificationSettings'
import SinksSettingsForm        from '../forms/SinksSettings'

// TODO save on ok

export default {
  name: 'SettingsModal',

  components : {
    BatchSettingsForm,
    NotificationSettingsForm,
    SinksSettingsForm
  }
}
</script>
