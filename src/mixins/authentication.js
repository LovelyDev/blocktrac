import config from '../config'

export default {
  data : function(){
    return {
      username : '',
      password : ''
    };
  },

  computed : {
    auth_token : function(){
      return this.$cookies.authToken;
    },

    logged_in : function(){
      return !!this.auth_token;
    }
  },

  methods : {
    register : function(){
      this.$http.post(config.BACKEND_URL + "/register",
                      {username : this.username,
                       password : this.password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    login : function(){
      this.$http.post(config.BACKEND_URL + "/login",
                      {username : this.username,
                       password : this.password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    logout : function(){
      this.$http.delete(config.BACKEND_URL + "/logout",
                {headers : {authorization : this.auth_token}})
                .then(function(response){
                  this.$removeCookie("authToken")

                }.bind(this)).catch(function(err){
                  this.$removeCookie("authToken")
                }.bind(this))
    }
  }
}
