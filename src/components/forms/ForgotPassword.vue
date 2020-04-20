<template>
  <table class="form_table">
    <tr>
      <td>Email address:</td>
      <td>
        <input class="form_input"
                type="text"
             v-model="auth_email" />
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'ForgotPasswordForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email;
    }
  }
}
</script>


<style scoped>
input{
  width: 100%;
}
</style>
