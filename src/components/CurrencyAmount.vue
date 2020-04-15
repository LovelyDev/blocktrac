<template>
  <span>
    <span v-if="is_drops">
      {{xrp_amount | round | delim}}
      <img src="@/assets/XRP.svg" style="height: 15px; width: 15px; margin-bottom: 2px" />
    </span>

    <!-- TODO render icons for all currencies -->
    <span v-else>
      {{amount["value"] | round | delim}}

      <span v-if="have_currency_unicode(amount['currency'])">
        <span v-html="currency_unicode(amount['currency'])"
              style="font-weight: bold;"/>
      </span>

      <span v-else>
        {{amount["currency"]}}
      </span>

      <sup v-if="!no_issuer">
        <AccountLink :account="amount['issuer']" shorten/>
      </sup>
    </span>
  </span>
</template>

<script>
import AccountLink from './AccountLink.vue'

import config      from '../config.js'

// TODO: shorten large values (1000 -> 1K, 1000000 -> 1M, 1250000 -> 1.25M, etc)

export default {
  name: 'CurrencyAmount',

  props : {
    amount : [String, Number, Object],
    no_issuer : Boolean
  },

  components : {
    AccountLink
  },

  computed : {
    is_drops : function(){
      var t = typeof(this.amount);
      return t === "string" || t === "number";
    },

    is_iou : function(){
      return !this.is_drops();
    },

    xrp_amount : function(){
      return parseFloat(this.amount) / config.DROPS_PER_XRP;
    }
  },

  methods : {
    have_currency_unicode : function(c){
      return !!config.CURRENCY_UNICODES[c];
    },

    currency_unicode : function(c){
      return config.CURRENCY_UNICODES[c];
    }
  }
}
</script>

<style scoped>
</style>
