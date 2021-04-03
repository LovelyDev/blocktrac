export default {
  install(Vue, options) {
    Vue.prototype.$htttp = function(){
      return this.$http;
    }
  }
}
