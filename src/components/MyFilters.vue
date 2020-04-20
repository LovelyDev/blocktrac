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
        <h5>My Filters</h5>

        <div id="settings" v-b-modal.settings_modal>
          <img src="../assets/bell.svg" width="15px"/>
          <span>Settings</span>
        </div>
      </div>

      <FilterList ref="filter_list"/>

      <div id="add_new_filter"
           v-b-modal.create_filter>
        + Add New Filter
      </div>

      <div>
        {{remaining_filters}} are left.
        <router-link to="/plans">Get a pro account</router-link>
      </div>
    </div>

    <CreateFilterModal @created="$refs.filter_list.load_filters()" />
    <SettingsModal />
  </div>
</template>

<script>
import Authentication    from '../mixins/authentication'
import FilterList        from './FilterList.vue'
import CreateFilterModal from './modals/CreateFilter.vue'
import SettingsModal     from './modals/Settings.vue'

export default {
  name: 'MyFilters',

  mixins : [Authentication],

  components : {
    FilterList,
    CreateFilterModal,
    SettingsModal
  },

  computed : {
    remaining_filters : function(){
      // TODO
      return "5 filters";
    }
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
  font-family: var(--theme-font3);
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

#my_filters_logged_in #header h5{
  margin-bottom: 0;
  font-family: var(--theme-font2);
}

#settings{
  background-color: var(--theme-color1);
  color: white;
  font-family: var(--theme-font3);
  border-radius: 10px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
}

#settings img{
  margin-right: 10px;
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
