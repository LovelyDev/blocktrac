<template>
  <b-modal id="delete_filter"
           title="Delete Filter"
           @ok="on_ok">
    <h3>Are you sure?</h3>
    <h5><i>This cannot be undone</i></h5>
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'DeleteFilter',

  mixins : [Authentication],

  props : {
    filter : Object
  },

  methods : {
    on_ok : function(){
      this.$http.delete(this.backend_url + "/filter/" + this.filter.id,
                        this.auth_header)
                .then(function(response){
                  this.$emit('deleted')

                }.bind(this)).catch(function(err){
                  // TODO
                })

    },
  }
}
</script>
