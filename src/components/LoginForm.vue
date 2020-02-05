<template>
  <div id="login_form">
    <input id="username_input"
           type="text"
           placeholder="Username"
           v-model="username" />

    <input id="password_input"
           type="text"
           placeholder="Password"
           v-model="password" />

    <button @click="login">
      Submit
    </button>
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'LoginForm',
  mixins : [Authentication]
}
</script>

<style scoped>
#login_form{
  text-align: center;
}

#username_input,
#password_input{
  margin: 5px;
}
</style>
