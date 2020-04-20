<template>
  <b-modal id="settings_modal"
           title="Filter Settings"
           ok-title="Save"
           ok-only
           header-class="modal_header">
    <BatchSettingsForm />
    <SinksSettingsForm />
  </b-modal>
</template>

<script>
import BatchSettingsForm from '../forms/BatchSettings.vue'
import SinksSettingsForm from '../forms/SinksSettings.vue'

// TODO save on ok

export default {
  name: 'SettingsModal',

  components : {
    BatchSettingsForm,
    SinksSettingsForm
  }
}
</script>
