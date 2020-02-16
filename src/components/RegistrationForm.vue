<template>
  <div id="registration_form">
    <input id="username_input"
           type="text"
           placeholder="Username"
           v-model="username" />

    <input id="password_input"
           type="text"
           placeholder="Password"
           v-model="password" />

    <!-- TODO: recaptcha -->

    <button @click="register">
      Submit
    </button>
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'

// TODO: hide password field, submit on enter

export default {
  name: 'RegistrationForm',

  mixins : [Authentication]
}
</script>

<style scoped>
#registration_form{
  text-align: center;
}

#username_input,
#password_input{
  margin: 5px;
}
</style>
