<template>
  <table id="login_form">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input id="email_input"
               type="text"
               v-model="auth_email" />
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input id="password_input"
               type="password"
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
table{
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
}

input{
  width: 100%;
}

#forgot_password{
  cursor: pointer;
}
</style>
