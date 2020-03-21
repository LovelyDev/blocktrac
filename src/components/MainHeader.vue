<template>
  <b-col cols="3" id="main_header">
    <b-row no-gutters>
      <b-col>
        <router-link to="/"><h1>{{ site_name }}</h1></router-link>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col>
        <h5>XRP Transaction Tracker</h5>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col v-if="!logged_in">
        <span id="login_link">Login</span>

        <b-popover id="login_popup"
                   target="login_link"
                   triggers="hover"
                   placement="bottom">
          <LoginForm />
        </b-popover>
      </b-col>

      <b-col v-if="!logged_in">
        <span id="register_link">Register</span>

        <b-popover id="register_popup"
                   target="register_link"
                   triggers="hover"
                   placement="bottom">
          <RegistrationForm />
        </b-popover>
      </b-col>

      <b-col v-if="logged_in">
        <router-link to="/filters">Filters</router-link>
      </b-col>

      <b-col v-if="logged_in">
        <router-link to="/profile">Profile</router-link>
      </b-col>

      <b-col v-if="logged_in">
        <span id="logout_link" @click="logout">
          Logout
        </span>
      </b-col>

      <b-col>
        <router-link to="/help">Help</router-link>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import LoginForm        from './LoginForm'
import RegistrationForm from './RegistrationForm'

import Authentication   from '../mixins/authentication'
import config           from '../config'

export default {
  name: 'MainHeader',

  mixins : [Authentication],

  components : {
    LoginForm,
    RegistrationForm
  },

  computed : {
    site_name : function(){
      return config.SITE_NAME;
    }
  }
}
</script>

<style scoped>
#main_header{
  text-align: center;
}

#login_link,
#register_link,
#logout_link{
  color: blue;
  cursor: pointer;
}
</style>
