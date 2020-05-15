<template>
  <b-modal id="create_filter"
           title="Create New Filter"
           ok-title="Create Filter"
           header-class="modal_header"
           centered
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
                   @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreatesFilter        from './creates_filter'
import CreateEditFilterForm from '../forms/CreateEditFilter'
import Validatable          from '../../mixins/validatable'

export default {
  name: 'CreateFilterModal',

  mixins : [Authentication, CreatesFilter, Validatable],

  components : {
    CreateEditFilterForm
  }
}
</script>
