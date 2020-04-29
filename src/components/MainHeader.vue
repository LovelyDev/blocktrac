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

    <div v-if="mq_lt_lg">
      <img id="main_hamburger_open_icon"
           src="../assets/hamburger.svg"
           @click="hamburger_visible = true"/>

      <transition name="fade">
        <div id="main_hamburger" v-show="hamburger_visible">
          <div id="hide_hamburger"
               @click="hamburger_visible = false">
            <img id="main_hamburger_close_icon"
                 src="../assets/x-white.svg" />
          </div>

          <MainNav hamburger @nav="hamburger_visible = false"/>
        </div>
      </transition>
    </div>

    <MainNav v-else />

    <LoginModal />
    <ForgotPasswordModal />
    <RegistrationModal />
    <RegisterFilterModal />
  </div>
</template>

<script>
import MainNav             from './MainNav'

import LoginModal          from './modals/Login'
import ForgotPasswordModal from './modals/ForgotPassword'
import RegistrationModal   from './modals/Registration'
import RegisterFilterModal from './modals/RegisterFilter'

export default {
  name: 'MainHeader',

  components : {
    MainNav,
    LoginModal,
    ForgotPasswordModal,
    RegistrationModal,
    RegisterFilterModal
  },

  data : function(){
    return {
      hamburger_visible : false
    };
  },
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

#main_layout.xs #main_header{
  align-items: unset;
}

#main_title_container{
  flex-grow: 1;
}

#main_title_container a{
  text-decoration: none;
}

#main_layout.xs #main_title{
  font-size: 1.1rem;
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

#main_hamburger_open_icon{
  width: 25px;
  cursor: pointer;
}

#main_layout.xs #main_hamburger_open_icon{
  width: 15px;
}

#main_hamburger{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  background-color: var(--theme-color1);
  padding: 20px;
}

#main_hamburger_close_icon{
  width: 25px;
}

#hide_hamburger{
  cursor: pointer;
  text-align: right;
}
</style>
