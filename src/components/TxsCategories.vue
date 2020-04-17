<template>
  <b-list-group horizontal id="tx_categories">
    <b-list-group-item v-for="category in primary_categories"
                        :key="category"
                         :id="'category-' + category"
                       class="tx_category primary_category"
                      :class="{enabled : is_enabled(category)}"
                      @click="toggle_category(category)">
      <img :src="category_icon(category)" class="category_icon" />

      <span class="category_name"
           :class="{enabled : is_enabled(category)}">
        {{category.toLowerCase()}}
      </span>

      <span class="category_tally"
           :class="{enabled : is_enabled(category)}"
            v-if="category_tallies[category] != 0">
        ({{category_tallies[category] | delim}})
      </span>
    </b-list-group-item>

    <b-list-group-item id="primary_secondary_separator">
      Other:
    </b-list-group-item>

    <b-list-group-item v-for="category in secondary_categories"
                        :key="category"
                         :id="'category-' + category"
                       class="tx_category secondary_category"
                      :class="{enabled : is_enabled(category)}"
                      @click="toggle_category(category)">
      <img :src="category_icon(category)"
            :id="'category-icon-' + category"
          class="category_icon" />

      <span class="category_tally"
            v-if="category_tallies[category] != 0">
        ({{category_tallies[category] | delim}})
      </span>

      <b-tooltip :target="'category-icon-' + category"
                 variant="light" placement="bottom">
        <span class="category_tooltip">
          {{category.toLowerCase()}}
        </span>
      </b-tooltip>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import config from '../config'

export default {
  name: 'TxsCategories',

  data : function(){
    return {
      all_categories : config.TX_CATEGORIES
    };
  },

  computed : {
    enabled_categories : function(){
      return this.$store.state.tx_categories;
    },

    primary_categories : function(){
      return this.all_categories.slice(0,
        config.SECONDARY_TX_CATEGORIES_INDEX);
    },

    secondary_categories : function(){
      return this.all_categories.slice(config.SECONDARY_TX_CATEGORIES_INDEX,
        this.all_categories.length);
    },

    category_tallies : function(){
      return this.$store.state.tx_category_tallies;
    }
  },

  methods : {
    is_enabled : function(category){
      const all = category == 'ALL';
      return ( all && this.enabled_categories.length == 0) ||
             (!all && this.enabled_categories.includes(category))
    },

    toggle_category : function(category){
      if(category == 'ALL')
        this.$store.commit('clear_tx_categories');

      else
        this.$store.commit('toggle_tx_category', category)
    },

    category_icon : function(category){
      const color = this.is_enabled(category) ? 'blue' : 'gray';
      const asset = category.replace(" ", "-")
                            .toLowerCase() +
                       "-" + color + '.svg';
      return require("../assets/txs/" + asset);
    }
  }
}
</script>

<style scoped>
#tx_categories{
  padding: 10px;
  padding-left: 30px;
  align-items: center;
}

#tx_categories .list-group-item{
  padding: 0;
  border: none;
}

.tx_category{
  cursor: pointer;
  display: flex;
  align-items: center;
}

.primary_category{
  flex-basis: 17%;
}

.secondary_category{
  flex-basis: 5%;
}

#primary_secondary_separator{
  flex-grow: 1;
  text-align: right;
  margin-right: 10px;
  font-size: 0.9rem;
}

.category_icon{
  width: 15px;
  height: 15px;
}

.category_name{
  text-transform: capitalize;
  font-size: 0.9rem;
  margin-left: 5px;
}

.category_name:not(.enabled){
  color: var(--theme-color2);
  opacity: 0.4;
}

.category_tally{
  font-size: 0.9rem;
  margin-left: 3px;
}

.category_tally:not(.enabled){
  color: var(--theme-color2);
  opacity: 0.4;
}

.category_tooltip{
  text-transform: capitalize;
  font-family: "Inter Regular";
}
</style>
