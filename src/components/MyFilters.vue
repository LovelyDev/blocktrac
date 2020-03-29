<template>
  <div>
    <div v-if="!logged_in" id="my_filters_anon">
      <h3>My filters</h3>

      <img src="../assets/my-filters-anon.png" class="mt-3"/>

      <p class="mt-3" style="color: #556475">
        Get notified when interesting transactions go through the network
      </p>

      <div id="personalized">
        <b>Set Personalized Filter</b>
      </div>
    </div>

    <div v-else id="my_filters_logged_in">
      <div id="header">
        <h4>My Filters</h4>

        <div id="settings">Settings</div>
      </div>

      <!-- TODO filters list -->

      <div id="add_new_filter"
           v-b-modal.create_filter>
        + Add New Filter
      </div>

      <b-modal id="create_filter"
               title="Create New Filter">
        <CreateEditFilter />
      </b-modal>

      <div>
        {{remaining}} are left.
        <router-link to="/plans">Get a pro account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Authentication   from '../mixins/authentication'
import CreateEditFilter from './CreateEditFilter.vue'

export default {
  name: 'MyFilters',

  mixins : [Authentication],

  components : {
    CreateEditFilter
  },

  computed : {
    remaining : function(){
      // TODO
      return "5 filters";
    }
  }
}
</script>

<style scoped>
#my_filters_anon{
  border: 1px solid #ececec;
  text-align: center;
  padding: 10px;
  background-color: white;
}

#personalized{
  background-color: #425265;
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
}

#settings{
  background-color: #a3b1c5;
  border-radius: 10px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
}

#add_new_filter{
  text-align: center;
  background-color: #eceff5;
  color: #5190fc;
  border-radius: 50px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
