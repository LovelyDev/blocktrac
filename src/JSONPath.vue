<!--
  * JSONPath help Page
  * Explains jsonpath syntax
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="jsonpath">
    <div id="jsonpath">
      <h1 id="jsonpath_title">JSONPath</h1>

      <div id="jsonpath_content">
        <h3 id="syntax">Syntax</h3>

        <p>The following is a brief overview of the JSONPath expression syntax.</p>

        <p>
          In JSONPath expressions the <b>$</b> represents to the top level object.
        <p>

         <p>
           Expressions can use <b>dot-notation</b> (<i>$.transaction.transaction.Paths[0][0].currency</i>)
           or <b>bracket-notation</b> (<i>$['transaction']['transaction']['Paths'][0][0]['currency']</i>)
           for input paths.
         </p>

         <p>
           JSONPath allows the wildcard symbol <b>*</b> for member names and array indices.
         </p>

         <p>
           <b>Script expressions</b> can be used as an alternative to explicit names or indices as in: <i>$.transaction.transaction.Paths[(@.length-1)][0].issuer</i>,
           using the symbol <b>@</b> for the current object.
         </p>

         <p>
           Filter expressions are supported via the syntax <b>?(&lt;boolean expr&gt;)</b> as in: <i>$.transaction.transaction.TakerGets[?(@.currency == 'CNY')]</i>
         </p>

        <h3 id="structure">Structure</h3>

         <p>
           Here is a complete overview of the JSONPath syntax elements:
         </p>

         <table>
         <tr>
           <th>JSONPath</th><th>Description</th>
         </tr>

         <tr>
         <td>$</td><td>The root object/element</td>
         </tr>

         <tr>
         <td>@</td><td>The current object/element</td>
         </tr>

         <tr>
         <td>. or []</td><td>Child operator</td>
         </tr>

         <tr>
         <td>..</td><td>Recursive descent.</td>
         </tr>

         <tr>
         <td>*</td><td>Wildcard. All objects/elements regardless their names.</td>
         </tr>

         <tr>
         <td>[]</td><td>Subscript operator. In Javascript and JSON it is the native array operator.</td>
         </tr>

         <tr>
         <td>[,]</td><td>Union operator in JSONPath allows alternate names or array indices as a set.</td>
         </tr>

         <tr>
         <td>[start:end:step]</td><td>Array slice operator</td>
         </tr>

         <tr>
         <td>?()</td><td>Applies a filter (script) expression.</td>
         </tr>

         <tr>
         <td>()</td><td>Script expression, using the underlying script engine.</td>
         </tr>
         </table>

         <br/>

         <h3 id="example">JSONPath example</h3>

         <p>
         The following is a transaction from the XRP transaction stream
         </p>

         <b-alert show variant="warning" id="top_level_wrapper_note">
           Before processing, Zerp Tracker wraps all XRP transactions in the following top level object:

           <br v-if="mq_xs" />

           <span id="transaction_wrapper_text">
             <b>{ transaction : &lt;actual transaction&gt; }</b>
           </span>
         </b-alert>

         <renderjson :data="tx" level="4" />

         <table id="example_table">
         <tr>
           <th>JSONPath</th><th>Result</th>
         </tr>

         <tr>
           <td>$.transaction.transaction.TransactionType</td><td>The transaction type: <b>OfferCreate</b></td>
         </tr>

         <tr>
           <td>$.transaction.transaction.Account</td><td>The sending account: <b>r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W</b></td>
         </tr>

         <tr>
          <td>$.transaction.meta.AffectedNodes.*</td><td>All affected nodes</td>
         </tr>

         <tr>
           <td>$..AffectedNodes[2]</td><td>The third node</td>
         </tr>

         <tr>
           <td>$..AffectedNodes[(@.length-1)] <b>-or-</b> $..AffectedNodes[-1:]</td><td>The last node</td>
         </tr>

         <tr>
           <td>$[?(@.transaction.TransactionType == 'OfferCreate' && @.meta.TransactionResult == 'tesSUCCESS')]</td><td>Filter by transaction type and result</td>
         </tr>

         <tr>
           <td>$..*</td><td>All members of JSON structure.</td>
         </tr>
        </table>

        <br/>

        <h3 id="gotchyas">Common Gotchyas</h3>

        <ul>
          <li>Zerp Tracker wraps transactions in a top level <b>transaction</b> object. Make sure to incoporate this into your JSONPath expression and/or use the recursive descent operator: <b>..</b></li>
          <li>Transactions returned by a XRPL server are in different formats depending on context. Transactions which are sent to clients in the <b>transaction stream</b> have <b>transaction</b> and <b>meta</b> objects (see the example above) whereas those returned by the <a href="https://xrpl.org/tx.html#response-format"><b>tx command</b></a> embed the <b>meta</b> object <b>and</b> transaction fields in a top level <b>result</b> object. <b>Zerp tracker runs filter expressions against transaction stream transcations</b></li>
          <li>Make sure to check for typos and structural inconsistencies against actual XRPL data</li>
        </ul>

        <h3 id="testing">Testing Expressions</h3>

        <p>
        On the <router-link to="/txs">Live Transactions</router-link> page you can build and test JSONPath expressions which are evaluated in real-time against the live transaction stream. Once you have an expression that meets your criteria, click the <b>Save Filter</b> button to be notified of matches.
        </p>

        <p>
        Saved filter expressions can be tested against a variety of pre-captured transactions by navigating to the <b>Filter Details Page</b> and clicking <b>Test Filter</b>.
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

import renderjson from './vendor/renderjson/renderjson.vue'

export default {
  name: 'JSONPath',

  components: {
    MainLayout,
    renderjson
  },

  data : function(){
    return {
      tx :
      { transaction : {
          "engine_result": "tesSUCCESS",
          "engine_result_code": 0,
          "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
          "ledger_hash": "BA4F0A7A39D7A456DEB07A2C480D0BE1342EDA83DD34C5FA3E9E0E970E81502B",
          "ledger_index": 56006451,
          "meta": {
            "AffectedNodes": [
              {
                "CreatedNode": {
                  "LedgerEntryType": "Offer",
                  "LedgerIndex": "84080CB93CC9BFC32C5A0AF75F8D5F22E854E38061E5EDD65DCB7FEE9121C56D",
                  "NewFields": {
                    "Account": "r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W",
                    "BookDirectory": "C83D47E70CDF44D0BB2868DA0CB61EC81DFB5D95E8BE7C62561A564228FD5B7F",
                    "OwnerNode": "00000000000003B2",
                    "Sequence": 4792223,
                    "TakerGets": {
                      "currency": "DSH",
                      "issuer": "rcXY84C4g14iFp6taFXjjQGVeHqSCh9RX",
                      "value": "0.5952440142519944"
                    },
                    "TakerPays": {
                      "currency": "EUR",
                      "issuer": "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
                      "value": "44.12657896640964"
                    }
                  }
                }
              },
              {
                "ModifiedNode": {
                  "FinalFields": {
                    "Flags": 0,
                    "IndexPrevious": "00000000000003B1",
                    "Owner": "r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W",
                    "RootIndex": "FDE0DCA95589B07340A7D5BE2FD72AA8EEAC878664CC9B707308B4419333E551"
                  },
                  "LedgerEntryType": "DirectoryNode",
                  "LedgerIndex": "877754995FA9A81BF87C8DECEFF066581563379F85DA9670261BB8DDDFD48E41"
                }
              },
              {
                "ModifiedNode": {
                  "FinalFields": {
                    "Account": "r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W",
                    "Balance": "153695970347",
                    "Flags": 0,
                    "OwnerCount": 53,
                    "Sequence": 4792224
                  },
                  "LedgerEntryType": "AccountRoot",
                  "LedgerIndex": "B1B9AAC12B56B1CFC93DDC8AF6958B50E89509F377ED4825A3D970F249892CE3",
                  "PreviousFields": {
                    "Balance": "153695970357",
                    "OwnerCount": 52,
                    "Sequence": 4792223
                  },
                  "PreviousTxnID": "B2327A6287B6385B201298ED7ECCCA24CD3C36BB2C05D3AEF04819678F07CF5B",
                  "PreviousTxnLgrSeq": 56006451
                }
              },
              {
                "CreatedNode": {
                  "LedgerEntryType": "DirectoryNode",
                  "LedgerIndex": "C83D47E70CDF44D0BB2868DA0CB61EC81DFB5D95E8BE7C62561A564228FD5B7F",
                  "NewFields": {
                    "ExchangeRate": "561A564228FD5B7F",
                    "RootIndex": "C83D47E70CDF44D0BB2868DA0CB61EC81DFB5D95E8BE7C62561A564228FD5B7F",
                    "TakerGetsCurrency": "0000000000000000000000004453480000000000",
                    "TakerGetsIssuer": "06B80F0F1D98AEDA846ED981F741C398FB2C4FD1",
                    "TakerPaysCurrency": "0000000000000000000000004555520000000000",
                    "TakerPaysIssuer": "2ADB0B3959D60A6E6991F729E1918B7163925230"
                  }
                }
              }
            ],
            "TransactionIndex": 32,
            "TransactionResult": "tesSUCCESS"
          },
          "status": "closed",
          "transaction": {
            "Account": "r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W",
            "Fee": "10",
            "Flags": 0,
            "LastLedgerSequence": 56006453,
            "Sequence": 4792223,
            "SigningPubKey": "03C48299E57F5AE7C2BE1391B581D313F1967EA2301628C07AC412092FDC15BA22",
            "TakerGets": {
              "currency": "DSH",
              "issuer": "rcXY84C4g14iFp6taFXjjQGVeHqSCh9RX",
              "value": "0.5952440142519944"
            },
            "TakerPays": {
              "currency": "EUR",
              "issuer": "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
              "value": "44.12657896640964"
            },
            "TransactionType": "OfferCreate",
            "TxnSignature": "304402205147BD78DDC60E9A9C5DA7A89747986F5B5108D7202369D2045AA434C8E9E77F0220289DF3D7C8FEE1EF0D714AB64C0D1F9792E85CBC79BC1D4A61B33724036501D5",
            "date": 644918432,
            "hash": "8E76EE6EAB5D36020240213071938EDFC7B32477D2FC9D14AD21AE2615F339CC",
            "owner_funds": "1.856316345150129"
          },
          "type": "transaction",
          "validated": true
        }
      }
    }
  }
}
</script>

<style scoped>
#jsonpath{
  margin-bottom: 25px;
  padding: 5px;
  padding-top: 25px;
}

#jsonpath_title{
  font-family: var(--theme-font3);
  font-weight: bold;
}

#jsonpath_content{
  padding: 25px;
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: white;
  font-family: var(--theme-font1);
}

#main_layout.md #jsonpath_content,
#main_layout.sm #jsonpath_content,
#main_layout.xs #jsonpath_content{
  padding: 10px;
}

table{
  width: 100%;
}

#main_layout.sm table,
#main_layout.xs table{
  word-break: break-word;
}

tr{
  border: 1px solid black;
}

th, td{
  padding: 5px;
}

#top_level_wrapper_note{
  font-size: 1.1rem;
}

#main_layout.xs #top_level_wrapper_note{
  font-size: 0.8rem;
}

#transaction_wrapper_text{
  white-space: pre;
}

#main_layout.xs #transaction_wrapper_text{
  white-space: unset;
}
</style>
