<template>
  <b-modal :id="id"
           :title="'Create ' + type_text"
           centered
           @ok="create_sink"
           :ok-disabled="!is_valid">
    <CreateSinkForm ref="form"
                  :type="type"
             @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'
import CreateSinkForm from '../forms/CreateSink'
import Validatable    from '../../mixins/validatable'

import util from '../../util'

export default {
  name: 'CreateSinkModal',

  mixins : [Authentication, Validatable],

  props : {
    id : {
      type : String,
      required : true
    },

    type : {
      type : String,
      required : true
    }
  },

  components : {
    CreateSinkForm
  },

  computed : {
    type_text : function(){
      return util.capitalize(this.type)
    },
  },

  methods : {
    create_sink : function(){
      const params = { type : this.type, target : this.$refs.form.target }

      this.$http.post(this.backend_url + "/sink",
                        params, this.auth_header)
                .then(function(response){
                  this.$emit('created', response.body)

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not create sink: " + msg)
                })
    }
  }
}
</script>
