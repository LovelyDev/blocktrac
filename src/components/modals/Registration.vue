<template>
  <b-modal id="register_modal"
           ref="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="register_modal_header"
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
import RegistrationForm from '../RegistrationForm.vue'

// TODO: submit on enter

export default {
  name: 'RegistrationModal',

  components : {
    RegistrationForm
  },

  data : function(){
    return {
      // XXX: $refs not available to
      //      tie to ok-disabled directly
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

<style scoped>
</style>

<style>
.register_modal_header h5{
  font-weight: bold;
}
</style>
