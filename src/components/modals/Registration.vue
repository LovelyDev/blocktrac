<template>
  <b-modal id="register_modal"
           ref="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="register"
           :ok-disabled="!is_valid"
           no-stacking>
    <RegistrationForm ref="form"
               @validated="validate($event)"
               @submit="submit" />
  </b-modal>
</template>

<script>
import RegistrationForm from '../forms/Registration'
import Validatable      from '../../mixins/validatable'

export default {
  name: 'RegistrationModal',

  mixins : [Validatable],

  components : {
    RegistrationForm
  },

  methods : {
    register : function(){
      this.$refs.form.register();
    },

    submit : function(){
      if(this.is_valid){
        this.register()
        this.$refs.register_modal.hide()
      }
    }
  }
}
</script>
