<template>
  <b-modal id="register_modal"
           ref="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="register_modal_header"
           centered
           @ok="register"
           no-stacking>
    <table id="registration_form">
      <tr>
        <td>Email address:</td>
        <td>
          <input id="email_input"
                 type="text"
                 v-model="auth_email" />
        </td>
      </tr>

      <tr>
        <td>Password:</td>
        <td>
          <input id="password_input"
                 type="text"
                 placeholder="Password"
                 v-model="auth_password" />
         </td>
      </tr>

      <tr>
        <td></td>
        <td id="existing_account"
            v-b-modal.login_modal>
          Already have an account?
        </td>
      </tr>
    </table>
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'

// TODO: hidden password field, confirm password field, submit on enter

export default {
  name: 'RegistrationModal',

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

#existing_account{
  cursor: pointer;
}
</style>

<style>
.register_modal_header h5{
  font-weight: bold;
}
</style>
