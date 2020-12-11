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
      <b v-if="have_amount && !no_amount">
        {{amount | abbrev}}
      </b>

      <span class="currency">
        <CurrencyIcon currency="XLM" />
      </span>
    </span>

    <span v-else>
      <b v-if="have_amount && !no_amount">
        {{amount | abbrev}}
      </b>

      <CurrencyIcon :currency="asset_code" />

      <sup v-if="!no_issuer">
        <AccountLink :account="issuer" shorten />
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
      type : [Object, String],
      required : true
    },

    amount : {
      type : Number,
    },

    no_amount : Boolean,
    no_issuer : Boolean
  },

  computed : {
    have_amount : function(){
      return !!this.amount || this.amount == 0;
    },

    is_native : function(){
      return this.currency._type == "assetTypeNative";
    },

    asset_code : function(){
      return typeof(this.currency) === 'string' ?
             this.currency :
             this.currency.alphaNum4.assetCode;
    },

    issuer : function(){
      return this.currency.alphaNum4.issuer.ed25519;
    }
  }
}
</script>
