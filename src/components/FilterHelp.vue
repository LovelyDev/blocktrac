<!--
  * Filter Help Content
  * Help popup rendered on LiveTxs page when user clicks help link.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="filter_help">
    <p>
      <router-link to="/jsonpath">JSONPath</router-link> is a powerful path expression language that can be used to match and filter live transactions.
    </p>

    <p>
      With JSONPath it is possible to <b>deep inspect</b> each and every transaction to look for and match any criteria!
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

    <ul id="filter_help_examples">
      <li class="filter_help_example">
        <b class="json_example" v-on:click="set_filter">
          $..[?(parseInt(@.Amount) > 500000000)]
        </b>
        <br/>
        Filter out payments &lt; 500M Drops (500 XRP)
      </li>

      <li class="filter_help_example">
        <b class="json_example" v-on:click="set_filter">
          $..[?(@.TransactionType && @.TransactionType != 'OfferCreate')]
        </b>
        <br/>
        Filter out OfferCreate Transactions
      </li>

      <li class="filter_help_example">
        <b class="json_example" v-on:click="set_filter">
          $..[?(@.TransactionResult == 'tesSUCCESS')]
        </b>
        <br/>
        Filter Transactions by specific result type
      </li>

      <li class="filter_help_example">
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
#filter_help{
  color: var(--theme-color2);
}

#filter_help_examples{
  padding-left: 15px;
  list-style-type: none;
}

.filter_help_example{
 margin-bottom: 5px;
}

.json_example{
  color: var(--theme-color1);
  cursor: pointer;
}
</style>
