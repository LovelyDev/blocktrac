<!--
  * Main Site Header
  * Rendered on all pages.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="main_header">
    <MainTitle />

    <HamburgerNav v-if="mq_lt_lg" />
    <MainNav      v-else />

    <LoginModal />
    <ForgotPasswordModal />
    <RegistrationModal />
    <RegisterFilterModal />
  </div>
</template>

<script>
import MainTitle           from './MainTitle'

import MainNav             from './MainNav'
import HamburgerNav        from './HamburgerNav'

import LoginModal          from './modals/Login'
import ForgotPasswordModal from './modals/ForgotPassword'
import RegistrationModal   from './modals/Registration'
import RegisterFilterModal from './modals/RegisterFilter'

export default {
  name: 'MainHeader',

  components : {
    MainTitle,

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
  width: 90%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
</style>
