<template>
  <b-modal id="forgot_password_modal"
           title="Reset Password"
           ok-title="Reset"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="reset_password"
           :ok-disabled="!is_valid"
           no-stacking>
    <ForgotPasswordForm ref="forgot_password_form"
                 @validated="validate($event)" />
  </b-modal>
</template>

<script>
import ForgotPasswordForm from '../forms/ForgotPassword.vue'
import Validatable        from '../../mixins/validatable'

export default {
  name: 'ForgotPasswordModal',

  mixins : [Validatable],

  components : {
    ForgotPasswordForm
  },

  methods : {
    reset_password : function(){
      this.$refs.forgot_password_form.reset_password();
    }
  }
}
</script>
