<template>
  <TxsLayout section="filter">
    <div id="filter_details">
      <FilterHeader />

      <div v-if="matched_txs.length == 0" id="no_matches">
        <img id="no_matches_icon"
             src="./assets/bell-green-border.svg" />

        <div id="no_matches_text">
          No matches at the moment
        </div>

        <div id="notifications_text">
          <span id="get_notifications">You will get notifications via</span>
          ... <!-- TODO sinks -->
        </div>

        <div id="check_filter">
          Check your filter for proper composition
        </div>

        <div id="test_link">
          <router-link :to="'/test/' + id">
            <img id="test_link_icon"
                 src="./assets/gear.svg" />
            <span>Test filter</span>
          </router-link>
        </div>
      </div>

      <div v-else>
        <!-- TODO render matched transactions -->
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import TxsLayout      from './components/TxsLayout'
import FilterHeader   from './components/FilterHeader'

export default {
  name: 'FilterDetails',

  mixins : [Authentication, ServerAPI],

  components: {
    TxsLayout,
    FilterHeader
  },

  props : {
    id : Number
  },

  watch : {
    // XXX: need to watch route incase switching between filters
    $route : function(){
      this.load_filter(this.id)
      this.load_matched_txs(this.id)
    }
  },

  created : function(){
    this.load_filter(this.id)
    this.load_matched_txs(this.id)
  }
}
</script>

<style scoped>
#filter_details{
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#no_matches{
  padding: 25px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#no_matches_text,
#notifications_text{
  font-family: var(--theme-font1);
}

#get_notifications{
  color: #ABB5BF;
}

#no_matches_icon{
  margin-bottom: 25px;
}

#check_filter{
  font-size:0.8rem;
  margin-top: 30px;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
  opacity: 0.6;
}

#test_link{
  padding: 5px 65px;
  margin-top: 5px;

  border-radius: 15px;
  background-color: var(--theme-color1);
}

#test_link a{
  text-decoration: none;
  font-family: var(--theme-font3);
  font-weight: bold;

  color: white;
  display: flex;
}

#test_link_icon{
  margin-right: 10px;
}
</style>
