<template>
  <b-modal id="login_modal"
           title="Login"
           ok-title="Login"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="login"
           :ok-disabled="!is_valid"
           no-stacking>
    <LoginForm ref="form"
        @validated="validate($event)" />
  </b-modal>
</template>

<script>
import LoginForm   from '../forms/Login'
import Validatable from '../../mixins/validatable'

export default {
  name: 'LoginModal',

  mixins : [Validatable],

  components : {
    LoginForm
  },

  methods : {
    login : function(){
      this.$refs.form.login();
    }
  }
}
</script>
