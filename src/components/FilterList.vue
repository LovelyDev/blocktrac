<template>
  <div>
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
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'
import ServerAPI      from '../mixins/server_api'

export default {
  name: 'FilterList',

  mixins : [Authentication, ServerAPI],

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
</style>
