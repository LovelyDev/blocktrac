<template>
  <div>
    <span v-b-modal.filter_help><sup>Help</sup></span>
    <b-form-input v-model="filter" placeholder="JSONPath Expression..." />

    <b-modal id="filter_help" title="JSONPath Help" ok-only>
      <p>
        <a href="https://www.toolsqa.com/rest-assured/jsonpath-and-query-json-using-jsonpath/">JSONPath</a> is a powerful path expression language that can be used to match and filter live transactions.
      </p>

      <p>
        With JSONPath it is possible to <b>deep inspect</b> each and every live transaction to look for and match any criteria!
      </p>

      <p>
        Look for:
      </p>

      <ul>
        <li>Payment in value ranges and/or of specific currencies</li>
        <li>Offer Pairs</li>
        <li>Specific Account Activity</li>
        <li>And anything else!</li>
      </ul>

      <p>
      For example the following are valid JSONPath expressions:
      </p>

      <ul style="font-size: 0.85em">
        <li style="margin-bottom: 5px;"><b class="json_example" v-on:click="set_filter">$..[?(parseInt(@.Amount) > 500000000)]</b><br/>Filter out payments &lt; 500M Drops (500 XRP)</li>
        <li style="margin-bottom: 5px;"><b class="json_example" v-on:click="set_filter">$..[?(@.TransactionType && @.TransactionType != 'OfferCreate')]</b><br/> Filter out OfferCreate Transactions</li>
        <li style="margin-bottom: 5px;"><b class="json_example" v-on:click="set_filter">$..[?(@.TransactionResult == 'tesSUCCESS')]</b><br/> Filter Transactions by specific result type</li>
        <li style="margin-bottom: 5px;"><b class="json_example" v-on:click="set_filter">$.meta.AffectedNodes[?(@.CreatedNode.LedgerEntryType == 'AccountRoot')]</b><br/> View transactions which create new accounts</li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TxFilter',

  computed : {
    filter : {
      get : function(){
        return this.$store.state.tx_filter;
      },

      set : function(v){
        this.$store.commit('update_tx_filter', v);
      }
    }
  },

  methods : {
    set_filter : function(e){
      this.filter = e.currentTarget.textContent
    }
  },
}
</script>

<style scoped>
div {
  text-align: right;
  margin-right: 5px;
  color: blue;
  cursor: pointer;
}

input {
  display: inline-block;
  font-size: 0.75em;
  width: 250px;
  margin-left: 5px;
}

input.sm{
  font-size: 0.45em;
}

.json_example{
  color: blue;
  cursor: pointer;
}
</style>
