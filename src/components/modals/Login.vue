<template>
  <b-modal id="login_modal"
           title="Login"
           ok-title="Login"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="login"
           :ok-disabled="ok_disabled"
           no-stacking>
    <LoginForm ref="login_form"
            @valid="ok_disabled = false"
          @invalid="ok_disabled = true" />
  </b-modal>
</template>

<script>
import LoginForm from '../forms/Login.vue'

export default {
  name: 'LoginModal',

  components : {
    LoginForm
  },

  data : function(){
    return {
      ok_disabled : true
    }
  },

  methods : {
    login : function(){
      this.$refs.login_form.login();
    }
  }
}
</script>
