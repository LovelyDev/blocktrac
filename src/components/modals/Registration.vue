<template>
  <b-modal id="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="register"
           :ok-disabled="!is_valid"
           no-stacking>
    <RegistrationForm ref="form"
               @validated="validate($event)" />
  </b-modal>
</template>

<script>
import RegistrationForm from '../forms/Registration.vue'
import Validatable      from '../../mixins/validatable'

// TODO: submit on enter (and other modals)

export default {
  name: 'RegistrationModal',

  mixins : [Validatable],

  components : {
    RegistrationForm
  },

  methods : {
    register : function(){
      this.$refs.form.register();
    }
  }
}
</script>
