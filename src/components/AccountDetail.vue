<template>
  <div class="account_detail">
    <div class="tx_detail_label">
      <img src="../assets/person2.svg" />&nbsp;
      <span>{{text}}</span>
    </div>

    <AccountLink :account="account" />
  </div>
</template>

<script>
import AccountLink from './AccountLink.vue'

export default {
  name: 'AccountDetail',

  components : {
    AccountLink
  },

  props : {
    text : {
      type : String,
      required : true
    },

    account : {
       text : {
         type : String,
         required : true
       }
    }
  }
}
</script>

<style scoped>
.account_detail{
  flex-basis: 32%;
  font-size: 0.8rem;
}
</style>
