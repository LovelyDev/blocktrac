<template>
  <span>
    <AccountLink v-bind:account="account" /> ->
    ...
    <AccountLink v-bind:account="destination" />
  </span>
</template>

<script>
import AccountLink from './AccountLink.vue'

// TODO remove

export default {
  name   : 'PaymentChannel',

  props : {
        account : String,
        paychan : String,
         amount : [String, Number],
    destination : String,
  },

  components : {
    AccountLink
  }
}
</script>
