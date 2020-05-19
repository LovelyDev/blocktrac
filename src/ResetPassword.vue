<!--
  * ResetPassword Page
  * Wrapse ResetPasswordForm allowing the user to reset their
  * password, sending a request to the server to complete the process.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="reset">
    <div id="reset">
      <h1>Reset Password</h1>

      <div id="reset_content">
        <ResetPasswordForm ref="form"
                    @validated="validate($event)"
                       @submit="submit" />

        <div id="reset_wrapper">
          <b-button :disabled="!is_valid"
                    @click="submit">
            Reset
          </b-button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout        from './components/MainLayout'
import ResetPasswordForm from './components/forms/ResetPassword'

import Authentication    from './mixins/authentication'
import ServerAPI         from './mixins/server_api'
import Validatable       from './mixins/validatable'

import util from './util'

export default {
  name: 'ResetPassword',

  mixins : [Authentication, ServerAPI, Validatable],

  components: {
    MainLayout,
    ResetPasswordForm
  },

  props : {
    code : {
      type : String,
      required : true
    }
  },

  methods : {
    submit : function(){
      if(!this.is_valid) return;

      const password = this.$refs.form.auth_password
      const params = {code : this.code, password : password}

      this.reset_password(params)
          .then(function(res){
            alert("Password successfully reset");

            this.$router.push("/txs")

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not reset password: " + msg);

            this.$router.push("/txs")
          })
    }
  }
}
</script>

<style scoped>
#reset{
  width: 70%;
  margin: auto;
  margin-top: 20px;
}

#reset_content{
  background-color: white;
  border: 1px solid var(--theme-color3);
  border-radius: 15px;
  padding: 25px;
}

#reset_wrapper{
  text-align: right;
}
</style>
