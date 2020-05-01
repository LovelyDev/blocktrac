<template>
  <b-modal id="duplicate_filter"
           title="Duplicate Filter"
           header-class="modal_header"
           centered
           @ok="on_ok">
    <CreateEditFilterForm ref="form"
            :duplicate_filter="filter" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../forms/CreateEditFilter'

export default {
  name: 'DuplicateFilterModal',

  mixins : [Authentication, CreatesFilter],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : {
      type : Object,
      required : true
    }
  }
}
</script>
