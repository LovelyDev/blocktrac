<template>
  <TxsLayout section="filter">
    <div id="filter_details">
      <FilterHeader :filter="filter" />

      <div>
        <!-- TODO match transactions -->
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import TxsLayout      from './components/TxsLayout.vue'
import FilterHeader   from './components/FilterHeader.vue'

// XXX: cannot name 'Filter' (vue warning)
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

  created : function(){
    this.load_filter(this.id)
  }
}
</script>

<style scoped>
#filter_details{
  background-color: white;
  min-height: 100%;
}
</style>
