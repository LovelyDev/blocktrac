<!--
  * BTC Tx Summary Component
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="btc_tx_summary" :title="title">
    <div class="mined" v-if="mined">
      <b>Miner</b>
    </div>

    <div class="inputs" v-else>
      <div v-for="(input, index) in input_addresses"
           :key="hash + '-input-' + index">
        <AccountLink :account="input" :text="input" />
      </div>
    </div>

    <div class="total_out" @click="nav_to_tx">
      <img src="../../assets/right-arrow-black.svg" />
      <BTCCurrencyAmount :amount="total_out" />
    </div>

    <div class="outputs">
      <div v-for="(output, index) in output_addresses"
           :key="hash + '-output-' + index">
        <AccountLink :account="output" :text="output" />
      </div>
    </div>
  </div>
</template>

<script>
import Meta from './btc/meta'

import AccountLink from '../AccountLink'
import BTCCurrencyAmount from '../currency_amount/BTC'

export default {
  name: 'BTCTxSummary',

  mixins : [Meta],

  components : {
    AccountLink,
    BTCCurrencyAmount
  },

  computed : {
    title : function(){
      return this.formatted_time;
    }
  },

  methods : {
    nav_to_tx : function(){
      this.$router.push("/tx/" + this.hash);
    }
  }
}
</script>

<style scoped>
.btc_tx_summary{
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.total_out{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 22%;
  cursor: pointer;
  font-family: var(--theme-font4);
}

.mined,
.inputs,
.outputs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 39%;
}

.mined{
  font-family: var(--theme-font3);
}

.outputs{
  text-align: right;
}
</style>
