<template>
  <img :src="src" />
</template>

<script>
export default {
  name: 'CurrencyIcon',

  props : {
    currency: String
  },

  computed : {
    src : function(){
      return require("@/assets/currencies/" + this.currency + ".svg");
    }
  }
}
</script>

<style scoped>
img{
  height: 15px;
  width: 15px;
  margin-bottom: 2px
}
</style>
