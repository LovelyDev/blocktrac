<template>
  <b-modal id="forgot_password_modal"
           title="Reset Password"
           ok-title="Reset"
           ok-variant="secondary"
           cancel-variant="light"
           @ok="reset_password"
           no-stacking>
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
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'ForgotPasswordModal',
  mixins : [Authentication]
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
