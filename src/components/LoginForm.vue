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
import config from '../config'

export default {
  name: 'LoginForm',

  data : function(){
    return {
      username : '',
      password : ''
    };
  },

  methods : {
    login : function(){
      this.$http.post(config.BACKEND_URL + "/login",
                      {username : this.username,
                       password : this.password})
                .then(function(response){
                  // ... set cookie, update local login state
                  console.log("logged in")
                  console.log(response)
                }).catch(function(err){
                  // TODO: better error handling
                  alert(err.body.error)
                })
    }
  }
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
