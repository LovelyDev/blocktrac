import config  from '../config'
import fr0xrpl from '../fr0xrpl'

export default {
  data : function(){
    return {
      auth_email : '',
      auth_password : '',
      auth_password_confirm : ''
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
    },

    authorized_filters : function(){
      if(!this.membership_level) return 0;

      // TODO: add additional filters associated with account
      return fr0xrpl.membership_features[this.membership_level].filters;
    },

    ///

    have_email : function(){
      return !!this.auth_email;
    },

    invalid_email : function(){
      return this.have_email &&
             !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.auth_email));
    },

    have_password : function(){
      return !!this.auth_password;
    },

    have_passwords : function(){
      return !!this.auth_password &&
             !!this.auth_password_confirm;
    },

    weak_password : function(){
      // TODO
      return this.have_password && false;
    },

    password_mismatch : function(){
      return this.have_passwords &&
            (this.auth_password != this.auth_password_confirm);
    },

    invalid_passwords : function(){
      return this.have_passwords &&
            (this.weak_password  ||
             this.password_mismatch);
    }
  },

  methods : {
    register : function(){
      var params = {email : this.auth_email,
                 password : this.auth_password}

      if(this.$store.state.in_progress_filter.server){
        params.filter = this.$store.state.in_progress_filter.server
        this.$store.commit('clear_in_progress_filter')
      }

      this.$http.post(this.backend_url + "/register", params)
                .then(function(response){
                  this.$setCookie("authToken", response.body.authToken);
                  this.load_user();

                }.bind(this)).catch(function(err){
                  alert(err.body.error)
                })
    },

    login : function(){
      var params = {email : this.auth_email,
                 password : this.auth_password}

      if(this.$store.state.in_progress_filter.server){
        params.filter = this.$store.state.in_progress_filter.server
        this.$store.commit('clear_in_progress_filter')
      }

      this.$http.post(this.backend_url + "/login", params)
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

      if(this.$route.path != "/txs")
        this.$router.push("/txs");
    },

    reset_password : function(){
      // TODO
    }
  }
}
