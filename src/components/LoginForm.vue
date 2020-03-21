<template>
  <b-modal id="login_modal"
           ref="login_modal"
           title="Login"
           ok-title="Login"
           ok-variant="secondary"
           cancel-variant="light"
           @ok="login"
           no-stacking>
    <table id="login_form">
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
                 v-model="password" />
        </td>
      </tr>

      <tr>
        <td></td>
        <td id="forgot_password"
            v-b-modal.forgot_password_modal>
          Forgot Password?
        </td>
      </tr>
    </table>
  </b-modal>
</template>

<script>
import Authentication from '../mixins/authentication'

// TODO: hide password field, submit on enter

export default {
  name: 'LoginForm',
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

#forgot_password{
  cursor: pointer;
}
</style>
