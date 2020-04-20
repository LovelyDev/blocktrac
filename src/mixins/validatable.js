export default {
  data : function(){
    return {
      is_valid : false
    }
  },

  methods : {
    validate : function(validated){
      this.is_valid = validated;
    }
  }
}
