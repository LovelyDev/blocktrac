<!--
  * Profile Page
  * Encapsulates the ProfileForm and allows user to update
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="profile">
    <div id="profile">
      <h1>Account:</h1>

      <ProfileForm />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout'
import ProfileForm    from './components/forms/Profile'
import Authentication from './mixins/authentication'

// TODO handle change email / password

export default {
  name: 'Profile',

  mixins : [Authentication],

  components: {
    MainLayout,
    ProfileForm
  }
}
</script>

<style scoped>
#profile{
  width: 70%;
  margin: auto;
  margin-top: 20px;
  font-family: var(--theme-font4);
}

#main_layout.md #profile,
#main_layout.sm #profile,
#main_layout.xs #profile{
  width: unset;
}

#profile h1{
  font-family: var(--theme-font3);
}
</style>
