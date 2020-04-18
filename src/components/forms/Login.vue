<template>
  <table id="login_form">
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
               type="password"
               v-model="auth_password" />
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
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'LoginForm',

  mixins : [Authentication],

  computed : {
    auth_valid : function(){
      return this.have_email &&
             this.have_password;
    }
  },

  watch : {
    auth_valid : function(){
      this.auth_valid ? this.$emit('valid') :
                        this.$emit('invalid');
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
