<template>
  <b-modal id="create_filter"
           title="Create New Filter"
           @ok="on_ok">
    <CreateEditFilterForm ref="form" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../CreateEditFilterForm.vue'

export default {
  name: 'CreateFilterModal',

  mixins : [Authentication, CreatesFilter],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : Object
  }
}
</script>
