import config from '../config'

export default {
  data : function(){
    return {
      username : '',
      password : ''
    };
  },

  computed : {
    backend_url : function(){
      return config.BACKEND_URL;
    },

    auth_token : function(){
      return this.$cookies.authToken;
    },

    auth_header : function(){
      return {headers : {authorization : this.auth_token}};
    },

    logged_in : function(){
      return !!this.auth_token;
    }
  },

  methods : {
    register : function(){
      this.$http.post(this.backend_url + "/register",
                      {username : this.username,
                       password : this.password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    login : function(){
      this.$http.post(this.backend_url + "/login",
                      {username : this.username,
                       password : this.password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    logout : function(){
      this.$http.delete(this.backend_url + "/logout",
                {headers : {authorization : this.auth_token}})
                .then(function(response){
                  this.$removeCookie("authToken")

                }.bind(this)).catch(function(err){
                  this.$removeCookie("authToken")
                }.bind(this))
    },

    reset_password : function(){
      // TODO
    }
  }
}
