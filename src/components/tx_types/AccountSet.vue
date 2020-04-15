<template>
  <span>
    Account Set
  </span>
</template>

<script>
var HasTx = require('../../mixins/has_tx').default

export default {
  name   : 'AccountSet',

  mixins : [HasTx]
}
</script>
