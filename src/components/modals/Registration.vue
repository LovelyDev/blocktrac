<template>
  <b-modal id="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="register"
           :ok-disabled="ok_disabled"
           no-stacking>
    <RegistrationForm ref="registration_form"
                   @valid="ok_disabled = false"
                 @invalid="ok_disabled = true"/>
  </b-modal>
</template>

<script>
import RegistrationForm from '../forms/Registration.vue'

// TODO: submit on enter (and other modals)

export default {
  name: 'RegistrationModal',

  components : {
    RegistrationForm
  },

  data : function(){
    return {
      // XXX: $refs not available to
      //      tie to ok-disabled directly
      //      (and in other modals)
      ok_disabled : true
    }
  },

  methods : {
    register : function(){
      this.$refs.registration_form.register();
    }
  }
}
</script>
