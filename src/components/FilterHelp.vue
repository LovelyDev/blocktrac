<template>
  <div>
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
      <li style="margin-bottom: 5px;">
        <b class="json_example" v-on:click="set_filter">
          $..[?(parseInt(@.Amount) > 500000000)]
        </b>
        <br/>
        Filter out payments &lt; 500M Drops (500 XRP)
      </li>

      <li style="margin-bottom: 5px;">
        <b class="json_example" v-on:click="set_filter">
          $..[?(@.TransactionType && @.TransactionType != 'OfferCreate')]
        </b>
        <br/>
        Filter out OfferCreate Transactions
      </li>

      <li style="margin-bottom: 5px;">
        <b class="json_example" v-on:click="set_filter">
          $..[?(@.TransactionResult == 'tesSUCCESS')]
        </b>
        <br/>
        Filter Transactions by specific result type
      </li>

      <li style="margin-bottom: 5px;">
        <b class="json_example" v-on:click="set_filter">
          $.meta.AffectedNodes[?(@.CreatedNode.LedgerEntryType == 'AccountRoot')]
        </b>
        <br/>
        View transactions which create new accounts
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterHelp',

  methods : {
    set_filter : function(e){
      this.$emit('set', e.currentTarget.textContent.trim());
    }
  }
}
</script>

<style>
.json_example{
  color: blue;
  cursor: pointer;
}
</style>
