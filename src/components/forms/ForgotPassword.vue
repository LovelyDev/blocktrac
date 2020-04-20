<template>
  <table id="forgot_password_form">
    <tr>
      <td>Email address:</td>
      <td>
        <input id="email_input"
               type="text"
               v-model="auth_email" />
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'ForgotPasswordForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email;
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
</style>
