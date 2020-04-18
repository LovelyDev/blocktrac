<template>
  <table id="registration_form">
    <tr>
      <td>Email address:</td>
      <td>
        <input id="email_input"
               type="text"
               v-model="auth_email" />
      </td>
    </tr>

    <tr v-if="invalid_email">
      <td></td>

      <td>
        <span class="registration_form_error">
          Invalid Email
        </span>
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

    <tr v-if="weak_password">
      <td></td>

      <td>
        <span class="registration_form_error">
          Weak password
        </span>
      </td>
    </tr>

    <tr>
      <td>Confirm Password:</td>
      <td>
        <input id="confirm_password_input"
               type="password"
               v-model="auth_password_confirm" />
       </td>
    </tr>

    <tr v-if="password_mismatch">
      <td></td>

      <td>
        <span class="registration_form_error">
          Passwords do not match
        </span>
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
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'RegistrationForm',

  mixins : [Authentication],

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

.registration_form_error{
  color: red;
  font-size: 0.9rem;
}

#existing_account{
  cursor: pointer;
}
</style>
