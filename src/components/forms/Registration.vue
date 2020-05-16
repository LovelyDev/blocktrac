<!--
  * Create Sink Form
  * Allows the user to register / create a new application account.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table class="form_table">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input class="form_input"
               type="text"
               @keyup.enter="$emit('submit')"
               v-model="auth_email" />

        <div class="form_text form_error">
          <span v-if="invalid_email">Invalid Email</span>
          <span v-else class="placeholder" />
        </div>
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               v-model="auth_password" />

        <div class="form_text form_error">
          <span v-if="weak_password">Weak password</span>
          <span v-else class="placeholder" />
        </div>
       </td>
    </tr>

    <tr>
      <td class="form_text">Confirm Password:</td>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               v-model="auth_password_confirm" />
        <div class="form_text form_error">
          <span v-if="password_mismatch">Passwords do not match</span>
          <span v-else class="placeholder" />
        </div>
      </td>
    </tr>

    <tr>
      <td>TODO: Agree to terms of service checkbox (with link to ToS page and validation checked)</td>
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
