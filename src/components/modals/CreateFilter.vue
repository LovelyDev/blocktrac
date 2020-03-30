<template>
  <b-modal id="create_filter"
           title="Create New Filter"
           @ok="on_ok">
    <CreateEditFilterForm ref="form" />
</b-modal>
</template>


<script>
import Authentication       from '../../mixins/authentication'
import CreateEditFilterForm from '../CreateEditFilterForm.vue'

export default {
  name: 'CreateFilterModal',

  mixins : [Authentication],

  components : {
    CreateEditFilterForm
  },

  methods : {
    on_ok : function(){
      // TODO validate form

      if(!this.logged_in)
        ; // TODO open register dialog,
          // store filter details to be created on register

      else
        this.create_filter(); // TODO create request
    },

    create_filter : function(){
      var params = this.$refs.form.server_params;

      this.$http.post(this.backend_url + "/filter",
                      params, this.auth_header)
                .then(function(response){
                  this.$emit('created');

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
</script>

<style scoped>
</style>
