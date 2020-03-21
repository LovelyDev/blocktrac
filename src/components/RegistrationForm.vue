<template>
  <b-modal id="register_modal"
           ref="register_modal"
           title="Register"
           ok-title="Register"
           ok-variant="secondary"
           cancel-variant="light"
           @ok="register"
           no-stacking>
    <table id="registration_form">
      <tr>
        <td>Email address:</td>
        <td>
          <input id="username_input"
                 type="text"
                 v-model="username" />
        </td>
      </tr>

      <tr>
        <td>Password:</td>
        <td>
          <input id="password_input"
                 type="text"
                 placeholder="Password"
                 v-model="password" />
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
import Authentication from '../mixins/authentication'

// TODO: hide password field, submit on enter

export default {
  name: 'RegistrationForm',

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
