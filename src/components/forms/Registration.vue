<template>
  <table class="form_table">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input class="form_input"
               type="text"
               v-model="auth_email" />
      </td>
    </tr>

    <tr v-if="invalid_email">
      <td></td>

      <td class="form_text">
        <span class="form_error">
          Invalid Email
        </span>
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input class="form_input"
               type="password"
               v-model="auth_password" />
       </td>
    </tr>

    <tr v-if="weak_password">
      <td></td>

      <td class="form_text">
        <span class="form_error">
          Weak password
        </span>
      </td>
    </tr>

    <tr>
      <td class="form_text">Confirm Password:</td>
      <td>
        <input class="form_input"
               type="password"
               v-model="auth_password_confirm" />
       </td>
    </tr>

    <tr v-if="password_mismatch">
      <td></td>

      <td class="form_text">
        <span class="form_error">
          Passwords do not match
        </span>
      </td>
    </tr>

    <tr>
      <td></td>
      <td id="existing_account"
          class="form_text"
          v-b-modal.login_modal>
        Already have an account?
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'RegistrationForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email     &&
            !this.invalid_email  &&
             this.have_passwords &&
            !this.invalid_passwords;
    }
  }
}
</script>

<style scoped>
#existing_account{
  cursor: pointer;
}
</style>
