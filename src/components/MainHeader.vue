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
      <RegisterFilterModal />
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
      <span id="my_account_link">
        <span>My Account</span>

        <span v-if="!my_account_visible">
          <img class="my_account_arrow"
                 src="../assets/arrow-down-gray.png" />
        </span>

        <span v-else>
          <img class="my_account_arrow"
                 src="../assets/arrow-up-blue.png" />
        </span>
      </span>

      <b-popover id="my_account_popover"
                 ref="my_account_popover"
                 target="my_account_container"
                 placement="bottomleft"
                 @show="my_account_show"
                 @hide="my_account_hide">
        <div id="profile_link">
          <img src="../assets/profile.svg" />
          <router-link to="/profile">Profile</router-link>
        </div>

        <div id="logout_link"
             @click="$refs.my_account_popover.$emit('close'); logout()">
          <img src="../assets/logout.svg" />
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
import RegisterFilterModal from './modals/RegisterFilter'

import Authentication   from '../mixins/authentication'

export default {
  name: 'MainHeader',

  mixins : [Authentication],

  components : {
    LoginModal,
    ForgotPasswordModal,
    RegistrationModal,
    RegisterFilterModal
  },

  data : function(){
    return {
      my_account_visible : false
    };
  },

  methods : {
    my_account_show : function(){
      this.my_account_visible = true;
    },

    my_account_hide : function(){
      this.my_account_visible = false;
    }
  }
}
</script>

<style scoped>
#main_header{
  width: 92%;
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

a:hover{
  text-decoration: none;
}

#about_link,
#help_link,
#login_link,
#register_link,
#profile_link,
#logout_link{
  font-family: var(--theme-font1);
}

#membership_level_link,
#my_account_link{
  font-family: var(--theme-font5);
}

#login_link,
#register_link,
#logout_link{
  cursor: pointer;
}

#about_link,
#help_link,
#login_link,
#my_account_link,
#profile_link a,
#logout_link{
  color: var(--theme-color2);
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
  flex-basis: 14%;
  text-align: right;
}

#membership_level_link_container a{
  background-color: var(--theme-color1);
  color: white;
  border-radius: 15px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

#my_account_container{
  flex-basis: 10%;
  cursor: pointer;
  text-align: right;
}

.my_account_arrow{
  width: 10px;
  height: 5px;
  margin-left: 7px;
}

#my_account_popover{
  font-size: 1.2rem;
  min-width: 125px;
  left: 50px !important;
}

#my_account_popover img{
  margin-right: 5px;
}

#profile_link,
#logout_link{
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 65px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
</style>
