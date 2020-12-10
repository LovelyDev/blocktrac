<!--
  * XLM Currency Amount Component
  * Renders a currency with icon and optional issuer as specified
  * by the given params.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span>
    <span v-if="is_native">
      <b v-if="!no_amount">{{amount | abbrev}}</b>

      <span class="currency">
        <CurrencyIcon currency="XLM" />
      </span>
    </span>

    <span v-else>
      <b v-if="!no_amount">{{amount | abbrev}}</b>

      <CurrencyIcon :currency="currency.alphaNum4.assetCode" />

      <sup v-if="!no_issuer">
        <AccountLink :account="currency.alphaNum4.issuer.ed25519"
                     shorten />
      </sup>
    </span>
  </span>
</template>

<script>
import AccountLink  from '../AccountLink'
import CurrencyIcon from '../CurrencyIcon'

export default {
  name: 'XLMCurrencyAmount',

  components : {
    AccountLink,
    CurrencyIcon
  },

  props : {
    currency : {
      type : Object,
      required : true
    },

    amount : {
      type : Number,
      required : true
    },

    no_amount : Boolean,
    no_issuer : Boolean
  },

  computed : {
    is_native : function(){
      return this.currency._type == "assetTypeNative";
    }
  }
}
</script>
