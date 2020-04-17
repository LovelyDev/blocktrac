<template>
  <div id="main_header">
    <div id="main_title_container">
      <router-link to="/txs">
        <h2 id="main_title">
          <span id="main_title1">
            Zerp
          </span>

          <span id="main_title2">
            XRP Transaction Tracker
          </span>
        </h2>
      </router-link>
    </div>

    <div id="about_link_container">
      <router-link to="/about">
        <span id="about_link">About</span>
      </router-link>
    </div>

    <div id="help_link_container">
      <router-link to="/help">
        <span id="help_link">Help</span>
      </router-link>
    </div>

    <div id="login_link_container" v-if="!logged_in">
      <span id="login_link" v-b-modal.login_modal>
        Login
      </span>

      <LoginModal />
      <ForgotPasswordModal />
    </div>

    <div v-if="!logged_in"
           id="register_link_container">
      <span id="register_link" v-b-modal.register_modal>
        Register
      </span>

      <RegistrationModal />
    </div>

    <div v-if="logged_in"
           id="membership_level_link_container">
      <router-link to="/plans">
        <span id="membership_level_link">
          {{is_premium_member ? 'Premium' : 'Get a pro account'}}
        </span>
      </router-link>
    </div>

    <div v-if="logged_in"
           id="my_account_container">
      <span id="my_account_link">My Account ▼</span>

      <b-popover id="my_account_popover"
                 target="my_account_container"
                 placement="bottom">
        <div id="profile_link">
          <span class="my_account_spacer">&nbsp;</span>
          <router-link to="/profile">Profile</router-link>
        </div>

        <div id="logout_link" @click="logout">
          <span class="my_account_spacer">&nbsp;</span>
          <span>Log out</span>
        </div>
      </b-popover>
    </div>
  </div>
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
  }
}
</script>

<style scoped>
#main_header{
  width: 90%;
  margin: auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

#main_title_container{
  flex-grow: 1;
}

#main_title{
  font-family: "Gilroy ExtraBold";
}

#main_title1{
 color: #395267;
 font-weight: bold;
}

#main_title2{
  color: var(--theme-color1);
}

a{
  color: black;
}

a:hover{
  text-decoration: none;
  color: black;
}

#about_link,
#help_link,
#login_link,
#register_link,
#profile_link,
#logout_link{
  font-family: "Inter Regular";
}

#membership_level_link,
#my_account_link{
  font-family: "Inter Bold";
}

#login_link,
#register_link,
#logout_link{
  cursor: pointer;
}

#about_link_container,
#help_link_container,
#login_link_container{
  flex-basis: 6%;
  text-align: right;
}

#register_link_container{
  flex-basis: 10%;
  text-align: right;
}

#register_link{
  border-radius: 15px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--theme-color1);
  color: white;
}

#membership_level_link_container{
  flex-grow: 3;
  cursor: pointer;
  background-color: #eff2f8;
  border-radius: 15px;
}

#membership_level_link_container a{
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
</style>
