<template>
  <b-modal id="duplicate_filter"
           title="Duplicate Filter"
           @ok="on_ok">
    <CreateEditFilterForm ref="form" :duplicate_filter="filter" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreateEditFilterForm from '../CreateEditFilterForm.vue'

export default {
  name: 'DuplicateFilterModal',

  mixins : [Authentication],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : Object
  },

  methods : {
    on_ok : function(){
      this.create_filter();
    },

    create_filter : function(){
      var params = this.$refs.form.server_params;

      this.$http.post(this.backend_url + "/filter",
                      params, this.auth_header)
                .then(function(response){
                  this.$emit('duplicated', response.body);

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
</script>
