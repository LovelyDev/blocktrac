export default {
  watch : {
    is_valid : function(){
      this.$emit('validated', this.is_valid)
    }
  }
}
