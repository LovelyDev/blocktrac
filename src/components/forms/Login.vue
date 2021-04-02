<!--
  * Create Sink Form
  * Allows the user to login to the web application
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
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
               :value="auth_email"
               @input="evnt=> auth_email = evnt.target.value" />
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               :value="auth_password"
               @input="evnt=> auth_password = evnt.target.value" />
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
// TODO autofill email suggestion

import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'
import Maintenance    from '../../mixins/maintenance'

import config         from '../../config/config'

export default {
  name: 'LoginForm',

  mixins : [Authentication, Validator, Maintenance],

  computed : {
    is_valid : function(){
      return this.have_email &&
             this.have_password;
    }
  },

  created : function(){
    if(this.maintenance_mode &&
      !this.on_maintenance_page)
       this.nav_to_maintenance();
  }
}
</script>

<style scoped>
#forgot_password{
  cursor: pointer;
}
</style>
