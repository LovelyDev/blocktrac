<template>
  <b-row no-gutters id="main_header">
    <b-col cols="8">
      <router-link to="/">
        <h1 style="margin-bottom: 0">
          <span style="font-weight: bold">Zerp</span>
          <span style="color: #b3bac2">Tracker</span>
        </h1>
      </router-link>
    </b-col>

    <b-col class="nav_link">
      <router-link to="/about">About</router-link>
    </b-col>

    <b-col class="nav_link">
      <router-link to="/help">Help</router-link>
    </b-col>

    <b-col v-if="!logged_in" class="nav_link">
      <span id="login_link" v-b-modal.login_modal>
        Login
      </span>

      <LoginForm />
      <ForgotPasswordForm />
    </b-col>

    <b-col v-if="!logged_in"
           id="register_wrapper"
           class="nav_link">
      <span id="register_link" v-b-modal.register_modal>
        Register
      </span>

      <RegistrationForm />
    </b-col>

    <b-col v-if="logged_in" class="nav_link">
      Upgrade | Premium
    </b-col>

    <b-col v-if="logged_in" class="nav_link">
      (Initial) My Account
    </b-col>
  </b-row>
</template>

<script>
import LoginForm          from './LoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import RegistrationForm   from './RegistrationForm'

import Authentication   from '../mixins/authentication'

export default {
  name: 'MainHeader',

  mixins : [Authentication],

  components : {
    LoginForm,
    ForgotPasswordForm,
    RegistrationForm
  }
}
</script>

<style scoped>
#main_header{
  width: 85%;
  margin-top: 10px;
  align-items: center;
}

.nav_link{
  text-align: center;
}

a{
  color: black;
}

a:hover{
  text-decoration: none;
  color: black;
}

#login_link,
#register_link{
  cursor: pointer;
}

#login_link{
  margin-right: 10px;
}

#register_wrapper{
  border-radius: 5px;
  padding: 5px;
  background-color: black;
  color: white;
}
</style>
