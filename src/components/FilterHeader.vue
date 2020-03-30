<template>
  <div id="filter_header">
    <div id="filter_subheader">
      <img src="../assets/filter-header.png" />

      <div>
        <div id="filter_title">{{filter.name}}</div>

        <div v-if="filter.Template">
          {{filter.Template.name}}:
          {{filter.params ? filter.params.join(", ") : ''}}
        </div>

        <div v-else>
          Expression: {{filter.jsonpath}}
        </div>
      </div>
    </div>

    <div>
      <span id="test_link" class="filter_action">
        <router-link :to="'/test/' + filter.id">⚙ Test Filter</router-link>
      </span>

      <span id="edit_link" class="filter_action">
        🖉 Edit
      </span>

      <span id="duplicate_link" class="filter_action">
        ⎘ Duplicate
      </span>

      <span id="delete_link"
            class="filter_action"
            v-b-modal.delete_filter>
        🗑
      </span>
    </div>

    <DeleteFilterModal :filter="filter" @deleted="$router.push('/txs')" />
  </div>
</template>

<script>
import DeleteFilterModal from './modals/DeleteFilter.vue'

export default {
  name: 'FilterHeader',

  components : {
    DeleteFilterModal
  },

  props : {
    filter : Object
  },
}
</script>

<style scoped>
#filter_header{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
}

#filter_subheader{
  display: flex;
  align-items: center;
}

#filter_subheader img{
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

#filter_title{
  font-weight: bold;
}

.filter_action{
  background-color: #e9edf4;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.filter_action a{
  color: black;
}
</style>
