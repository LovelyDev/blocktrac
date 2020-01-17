<template>
  <div v-bind:id="id" />
</template>

<script>
import style from './renderjson.css'
import renderjson from './renderjson.js'

renderjson.set_show_to_level(1);

export default {
  name: 'renderjson',

  props : {
    data : {}
  },

  computed : {
    id : function(){
      return "renderjson-" + Math.random();
    }
  },

  watch : {
    data : function(){
      var div = document.getElementById(this.id);
      var rendered = renderjson(this.data);

      div.innerHTML = "";
      div.appendChild(rendered)
    }
  },

  mounted : function(){
    var div = document.getElementById(this.id);
    var rendered = renderjson(this.data);
    div.appendChild(rendered)
  },

  beforeDestroy : function(){
  },
}
</script>
