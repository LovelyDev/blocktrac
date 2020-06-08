<!--
  * Create Sink Form
  * Allows the user to login to the web application
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table class="form_table">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input ref="email"
               class="form_input"
               type="text"
               autocapitalize="none"
               @keyup.enter="$emit('submit')"
               v-model="auth_email" />
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
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

import config         from '../../config'

export default {
  name: 'LoginForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email &&
             this.have_password;
    }
  },

  created : function(){
    if(config.MAINTENANCE_MODE && this.$route.path != '/maintenance')
      this.$router.push({path : '/maintenance'});
  }
}
</script>

<style scoped>
#forgot_password{
  cursor: pointer;
}
</style>
