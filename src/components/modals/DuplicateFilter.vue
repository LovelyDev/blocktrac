<template>
  <b-modal id="duplicate_filter"
           title="Duplicate Filter"
           centered
           @ok="on_ok">
    <CreateEditFilterForm ref="form"
            :duplicate_filter="filter" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../CreateEditFilterForm.vue'

export default {
  name: 'DuplicateFilterModal',

  mixins : [Authentication, CreatesFilter],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : Object
  }
}
</script>
