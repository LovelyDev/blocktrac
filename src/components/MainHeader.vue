<template>
  <b-row no-gutters id="main_header">
    <b-col cols="8">
      <router-link to="/txs">
        <h1 style="margin-bottom: 0">
          <span style="color: #395267; font-weight: bold">Zerp</span>
          <span style="color: #0091FF; margin-left: 1px">XRP Transaction Tracker</span>
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

      <LoginModal />
      <ForgotPasswordModal />
    </b-col>

    <b-col v-if="!logged_in"
           id="register_wrapper"
           class="nav_link">
      <span id="register_link" v-b-modal.register_modal>
        Register
      </span>

      <RegistrationModal />
    </b-col>

    <b-col v-if="logged_in"
           id="membership_level_container"
           class="nav_link">
      <router-link to="/plans">
        {{is_premium_member ? 'Premium' : 'Get a pro account'}}
      </router-link>
    </b-col>

    <b-col v-if="logged_in"
           id="my_account_container"
           class="nav_link">
      <span id="initial">{{initial}}</span> My Account ▼

      <b-popover id="my_account_popover"
                 target="my_account_container"
                 placement="bottom">
        <div>
          <span class="my_account_spacer">&nbsp;</span>
          <router-link to="/profile">Profile</router-link>
        </div>

        <div id="logout_link" @click="logout">
          <span class="my_account_spacer">&nbsp;</span>
          <span>Log out</span>
        </div>
      </b-popover>
    </b-col>
  </b-row>
</template>

<script>
import LoginModal          from './modals/Login'
import ForgotPasswordModal from './modals/ForgotPassword'
import RegistrationModal   from './modals/Registration'

import Authentication   from '../mixins/authentication'

export default {
  name: 'MainHeader',

  mixins : [Authentication],

  components : {
    LoginModal,
    ForgotPasswordModal,
    RegistrationModal
  },

  computed : {
    initial : function(){
      // XXX: email isn't available until after user is loaded
      if(!this.email)
        return '';

      return this.email[0].toUpperCase();
    }
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
#register_link,
#logout_link{
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

#membership_level_container{
  flex-grow: 3;
  cursor: pointer;
  background-color: #eff2f8;
  border-radius: 15px;
}

#membership_level_container a{
  color: #629ffb;
}

#my_account_container{
  flex-grow: 3;
  cursor: pointer;
}

#my_account_popover{
  font-size: 1.2rem;
  min-width: 125px;
}

.my_account_spacer{
  display: inline-block;
  height: 15px;
  width: 15px;

  background-color: #d3dae3;
  border-radius: 20px;
  margin-right: 5px;
}

#initial{
  display: inline-block;
  height: 35px;
  width: 35px;

  background-color: #d3dae3;
  padding: 7px;
  border-radius: 20px;
}
</style>
