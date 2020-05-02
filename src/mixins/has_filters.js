export default {
  computed : {
    filters : function(){
      return this.$store.state.filters;
    },

    remaining_filters : function(){
      return this.authorized_filters - this.filters.length;
    },

    remaining_filters_msg : function(){
      const remaining = this.remaining_filters;

      if(remaining == 1)
        return "1 filter is left. ";

      return remaining + " filters are left. ";
    }
  }
}
