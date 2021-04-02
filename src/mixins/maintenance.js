import config from '../config/config'

export default {
  computed : {
    maintenance_mode : function(){
      return !!config.MAINTENANCE_MODE;
    },

    on_maintenance_page : function(){
      return this.$route.path == '/maintenance';
    }
  },

  methods : {
    nav_to_maintenance : function(){
      this.$router.push({path : '/maintenance'});
    }
  }
}
