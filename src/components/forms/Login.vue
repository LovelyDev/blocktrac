<template>
  <table class="form_table">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input class="form_input"
               type="text"
               @keyup.enter="$emit('submit')"
               v-model="auth_email" />
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               v-model="auth_password" />
      </td>
    </tr>

    <tr>
      <td></td>
      <td id="forgot_password"
          class="form_text"
          v-b-modal.forgot_password_modal>
        Forgot Password?
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'LoginForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email &&
             this.have_password;
    }
  }
}
</script>

<style scoped>
#forgot_password{
  cursor: pointer;
}
</style>
