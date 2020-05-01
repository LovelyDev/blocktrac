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


    <HamburgerNav v-if="mq_lt_lg" />
    <MainNav      v-else />

    <LoginModal />
    <ForgotPasswordModal />
    <RegistrationModal />
    <RegisterFilterModal />
  </div>
</template>

<script>
import MainNav             from './MainNav'
import HamburgerNav        from './HamburgerNav'

import LoginModal          from './modals/Login'
import ForgotPasswordModal from './modals/ForgotPassword'
import RegistrationModal   from './modals/Registration'
import RegisterFilterModal from './modals/RegisterFilter'

export default {
  name: 'MainHeader',

  components : {
    MainNav,
    HamburgerNav,
    LoginModal,
    ForgotPasswordModal,
    RegistrationModal,
    RegisterFilterModal
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
</style>
