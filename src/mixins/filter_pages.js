export default {
  computed : {
    is_filter_page : function(){
      return this.$route.path.split("/")[1] == "filter";
    },

    is_test_page : function(){
      return this.$route.path.split("/")[1] == "test";
    }
  }
}
