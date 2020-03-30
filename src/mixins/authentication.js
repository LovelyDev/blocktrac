import config from '../config'

export default {
  data : function(){
    return {
      auth_email : '',
      auth_password : ''
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
    },

    email : function(){
      return this.$cookies.email;
    },

    profile : function(){
      return this.$cookies.profile;
    },

    membership_level : function(){
      return this.$cookies.membership_level;
    },

    is_basic_member : function(){
      return this.membership_level == 'basic';
    },

    is_premium_member : function(){
      return this.membership_level == 'premium';
    }
  },

  methods : {
    register : function(){
      this.$http.post(this.backend_url + "/register",
                      {email : this.auth_email,
                       password : this.auth_password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);
                  this.load_user();

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    login : function(){
      this.$http.post(this.backend_url + "/login",
                      {email : this.auth_email,
                       password : this.auth_password})
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);
                  this.load_user();

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    load_user : function(){
      return this.$http.get(this.backend_url + "/user", this.auth_header)
                       .then(function(response){
                         this.$setCookie("email", response.body.email)
                         this.$setCookie("membership_level", response.body.membership_level);
                         this.$setCookie("profile",  response.body.profile)
                       }.bind(this))
    },

    logout : function(){
      this.$http.delete(this.backend_url + "/logout",
                {headers : {authorization : this.auth_token}})
                .then(function(response){
                  this.$removeCookie("authToken")
                  this.$removeCookie("email")
                  this.$removeCookie("membership_level")
                  this.$removeCookie("profile");

                }.bind(this)).catch(function(err){
                  this.$removeCookie("authToken")
                  this.$removeCookie("email")
                  this.$removeCookie("membership_level")
                  this.$removeCookie("profile");
                }.bind(this))
// ... redirect user to /txs
    },

    reset_password : function(){
      // TODO
    }
  }
}
