<template>
  <b-modal id="duplicate_filter"
           title="Duplicate Filter"
           header-class="modal_header"
           centered
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
            :duplicate_filter="filter"
                   @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../forms/CreateEditFilter'
import Validatable          from '../../mixins/validatable'

export default {
  name: 'DuplicateFilterModal',

  mixins : [Authentication, CreatesFilter, Validatable],

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
