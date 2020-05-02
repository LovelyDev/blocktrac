<template>
  <div id="filter_actions">
    <router-link :to="'/filter/' + filter.id">
      <span id="live_link"
            class="filter_action"
            v-if="!is_filter_page">
          <img src="../assets/filters-back.png" width="25px" />
          <span>Back to Live Filtering</span>
      </span>
    </router-link>

    <router-link :to="'/test/' + filter.id">
      <div id="test_link"
            class="filter_action"
            v-if="!is_test_page">
          <img src="../assets/gear.svg" />
          <span>Test Filter</span>
      </div>
    </router-link>

    <div id="edit_link"
          class="filter_action"
          v-b-modal.edit_filter>
      <img src="../assets/pencil.svg">
      <span>Edit</span>
    </div>

    <div id="duplicate_link"
          class="filter_action"
          v-b-modal.duplicate_filter>
      <img src="../assets/duplicate.svg">
      <span>Duplicate...</span>
    </div>

    <div id="delete_link"
          class="filter_action"
          v-b-modal.delete_filter>
      <img src="../assets/trash-white.svg">
    </div>

    <EditFilterModal      :filter="filter" @edited="set_active_filter($event)" />
    <DuplicateFilterModal :filter="filter" @created="set_active_filter($event)" />
    <DeleteFilterModal    :filter="filter" @deleted="$router.push('/txs')" />
  </div>
</template>

<script>
import FilterPages          from '../mixins/filter_pages'
import ServerAPI            from '../mixins/server_api'

import DeleteFilterModal    from './modals/DeleteFilter'
import DuplicateFilterModal from './modals/DuplicateFilter'
import EditFilterModal      from './modals/EditFilter'


export default {
  name: 'FilterActions',

  mixins : [FilterPages, ServerAPI],

  components : {
    DeleteFilterModal,
    DuplicateFilterModal,
    EditFilterModal,
  }
}
</script>

<style scoped>
#filter_actions{
  display: flex;
}

#filter_actions a{
  text-decoration: none;
}

.filter_action{
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;

  background-color: var(--theme-color1);
  color: white;
}

.filter_action img{
  margin-right: 5px;
}

#live_link{
  background-color: var(--theme-color5);
}

#live_link a{
  color: white;
}

#delete_link{
  padding: 5px 20px;
}

#delete_link img{
  margin-right: 0;
}
</style>
