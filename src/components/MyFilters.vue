<template>
  <div>
    <div v-if="!logged_in" id="my_filters_anon">
      <div id="header">
        <h4>My filters</h4>
      </div>

      <img src="../assets/my-filters-anon.svg"
           style="width: 150px; height: 150px;"
           class="mt-3" />

      <p id="get_notified">
        Get notified when interesting transactions go through the network
      </p>

      <div id="personalized" v-b-modal.create_filter>
        <b>Set Personalized Filter</b>
      </div>
    </div>

    <div v-else id="my_filters_logged_in">
      <div id="header">
        <h4>My Filters</h4>

        <div id="settings" v-b-modal.settings_modal>
          <img src="../assets/bell-small.png" width="25px"/>
          <span>Settings</span>
        </div>
      </div>

      <!-- XXX: include route path in key so filter nav changes update active class -->
      <div v-for="filter in filters"
           :key="$route.path + filter.id"
           class="filter_row"
           :class="{active : is_active_filter(filter)}">
        <router-link :to="'/filter/' + filter.id">
          <div>
            <div class="filter_title">{{filter.name}}</div>

            <div v-if="filter.Template">
              <!-- TODO human friendly params -->
              {{filter.Template.name}}: {{filter.params.join(", ")}}
            </div>

            <div v-else>
              Expression: {{filter.jsonpath}}
            </div>
          </div>

          <div>
            <!-- TODO matches -->
          </div>

          <div>
            &gt;
          </div>
        </router-link>
      </div>

      <div id="add_new_filter"
           v-b-modal.create_filter>
        + Add New Filter
      </div>

      <div>
        {{remaining_filters}} are left.
        <router-link to="/plans">Get a pro account</router-link>
      </div>
    </div>

    <CreateFilterModal @created="load_filters" />
    <SettingsModal />
  </div>
</template>

<script>
import Authentication    from '../mixins/authentication'
import ServerAPI         from '../mixins/server_api'
import CreateFilterModal from './modals/CreateFilter.vue'
import SettingsModal     from './modals/Settings.vue'

export default {
  name: 'MyFilters',

  mixins : [Authentication, ServerAPI],

  components : {
    CreateFilterModal,
    SettingsModal
  },

  computed : {
    remaining_filters : function(){
      // TODO
      return "5 filters";
    }
  },

  methods : {
    is_active_filter : function(filter){
      return this.$route.path == "/filter/" + filter.id ||
             this.$route.path == "/test/"   + filter.id;
    }
  },

  created : function(){
    this.load_filters();
  }
}
</script>

<style scoped>
#my_filters_anon{
  border: 1px solid var(--theme-color3);
  border-radius: 4px;
  text-align: center;
  padding: 30px;
  background-color: white;
}

#my_filters_anon #header h4{
  font-family: "Helvetica Bold";
  font-weight: bold;
}

#get_notified{
 color: #556475;
 font-size: 14px;
}

#personalized{
  background-color: var(--theme-color1);
  color: white;
  border-radius: 15px;
  padding: 7px;
  cursor: pointer;
}

#my_filters_logged_in #header{
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#my_filters_logged_in #header h4{
  margin-bottom: 0;
  font-family: "Helvetica Regular";
}

#settings{
  background-color: #e9edf4;
  color: #415166;
  font-family: "Helvetica Bold";
  border-radius: 10px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
}

.filter_row{
  border-bottom: 1px solid var(--theme-color3);
  padding: 10px;
}

.filter_row a {
  color: #aeb5be;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter_row.active{
  background-color: #e9edf4;
  border-radius: 3px;
}

.filter_row.active a{
  color: #425265;
}

.filter_title{
  font-weight: bold;
}

#add_new_filter{
  text-align: center;
  background-color: #eceff5;
  color: #5190fc;
  border-radius: 50px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
