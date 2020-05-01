<template>
  <b-modal id="save_filter"
           title="Save Filter"
           header-class="modal_header"
           centered
           @ok="on_ok">
    <CreateEditFilterForm ref="form"
                 :save_filter="filter"/>
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../forms/CreateEditFilter'

export default {
  name: 'SaveFilterModal',

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
