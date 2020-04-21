<template>
  <b-modal id="edit_filter"
           title="Edit Filter"
           header-class="modal_header"
           centered
           @ok="on_ok">
    <CreateEditFilterForm ref="form"
                 :edit_filter="filter" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import CreateEditFilterForm from '../forms/CreateEditFilter.vue'

export default {
  name: 'EditFilterModal',

  mixins : [Authentication],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : {
      type : Object,
      required : true
    }
  },

  methods : {
    on_ok : function(){
      // TODO: validate form
      this.edit_filter();
    },

    edit_filter : function(){
      var params = this.$refs.form.server_params;

      this.$http.put(this.backend_url + "/filter/" + this.filter.id,
                      params, this.auth_header)
                .then(function(response){
                  const filter = response.body;
                  this.$emit('edited', filter);

                }.bind(this)).catch(function(err){
                  // TODO
                }.bind(this))
    }
  }
}
</script>
