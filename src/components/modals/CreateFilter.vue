<template>
  <b-modal id="create_filter"
           title="Create New Filter"
           ok-title="Create Filter"
           header-class="modal_header"
           centered
           @ok="on_ok">
    <CreateEditFilterForm ref="form" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../forms/CreateEditFilter'

export default {
  name: 'CreateFilterModal',

  mixins : [Authentication, CreatesFilter],

  components : {
    CreateEditFilterForm
  }
}
</script>
