<template>
  <span>
    <span v-if="is_drops">
      <b>{{xrp_amount | round | delim}}</b>
      <span class="currency">
        <CurrencyIcon currency="XRP" />
      </span>
    </span>

    <!-- TODO render icons for all currencies -->
    <span v-else>
      <b>{{amount["value"] | round | delim}}</b>

      <span v-if="have_currency_icon(amount['currency'])"
            class="currency">
        <CurrencyIcon :currency="amount['currency']" />
      </span>

      <span v-else class="currency">
        <b>{{amount["currency"]}}</b>
      </span>

      <sup v-if="!no_issuer">
        <AccountLink :account="amount['issuer']" shorten/>
      </sup>
    </span>
  </span>
</template>

<script>
import AccountLink  from './AccountLink'
import CurrencyIcon from './CurrencyIcon'

import config      from '../config.js'

// TODO: shorten large values (1000 -> 1K, 1000000 -> 1M, 1250000 -> 1.25M, etc)

export default {
  name: 'CurrencyAmount',

  props : {
    amount : {
      type : [String, Number, Object],
      required : true
    },

    no_issuer : Boolean
  },

  components : {
    AccountLink,
    CurrencyIcon
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
    have_currency_icon : function(c){
      return config.have_currency_icon(c);
    }
  }
}
</script>

<style scoped>
.currency{
  margin-left: 3px;
}
</style>
