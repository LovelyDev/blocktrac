<template>
  <b-list-group horizontal id="tx_categories">
    <b-list-group-item v-for="category in categories"
                        :key="category"
                       class="tx_category"
                      :class="is_enabled(category) ? 'enabled' : ''"
                      @click="set_category(category)">
      {{category}}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import config from '../config'

export default {
  name: 'TxsCategories',

  data : function(){
    return {categories : config.TX_CATEGORIES};
  },

  computed : {
    enabled_category : function(){
      return this.$store.state.tx_category;
    }
  },

  methods : {
    is_enabled : function(category){
      return category == this.enabled_category;
    },

    set_category : function(category){
      this.$store.commit('set_tx_category', category)
    }
  }
}
</script>

<style scoped>
#tx_categories{
  justify-content: center;
}

.tx_category{
  text-align: center;
  border: none;
  cursor: pointer;
}

.tx_category.list-group-item:first-child{
  border-bottom-left-radius: 0;
}

.tx_category.list-group-item:last-child{
  border-bottom-right-radius: 0;
}

.tx_category.enabled{
  border-bottom: 3px solid black;
  cursor: default;
}
</style>
