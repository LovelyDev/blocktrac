<template>
  <b-modal id="create_filter"
           title="Create New Filter">
    <CreateEditFilterForm />
</b-modal>
</template>


<script>
import CreateEditFilterForm from '../CreateEditFilterForm.vue'

export default {
  name: 'CreateFilterModal',

  components : {
    CreateEditFilterForm
  }
}
</script>

<style scoped>
</style>
