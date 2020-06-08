<!--
  * JSONPath help Page
  * Explains jsonpath syntax
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="jsonpath">
    <div id="jsonpath">
      <h1 id="jsonpath">JSONPath</h1>

      <div id="jsonpath_content">
        <h3>Syntax</h3>

        <p>The following is a brief overview of the JSONPath expression syntax.</p>

        <p>
          In JSONPath expressions the <b>$</b> represents to the top level object.
        <p>

         <p>
           Expressions can use <b>dot-notation</b> (<i>$.transaction.Paths[0][0].currency</i>)
           or <b>bracket-notation</b> (<i>$['transaction']['Paths'][0][0]['currency']</i>)
           for input paths.
         </p>

         <p>
           JSONPath allows the wildcard symbol <b>*</b> for member names and array indices.
         </p>

         <p>
           <b>Script expressions</b> can be used as an alternative to explicit names or indices as in: <i>$.transaction.Paths[(@.length-1)][0].issuer</i>,
           using the symbol <b>@</b> for the current object.
         </p>

         <p>
           Filter expressions are supported via the syntax <b>?(&lt;boolean expr&gt;)</b> as in: <i>$.transaction.TakerGets[?(@.currency == 'CNY')]</i>
         </p>

        <h3>Structure</h3>

         <p>
           Here is a complete overview of the JSONPath syntax elements:
         </p>

         <table>
         <tr>
           <th>JSONPath</th><th>Description</th>
         </tr>

         <tr>
         <td>$</td><td>the root object/element</td>
         </tr>

         <tr>
         <td>@</td><td>the current object/element</td>
         </tr>

         <tr>
         <td>. or []</td><td>child operator</td>
         </tr>

         <tr>
         <td>..</td><td>recursive descent.</td>
         </tr>

         <tr>
         <td>*</td><td>wildcard. All objects/elements regardless their names.</td>
         </tr>

         <tr>
         <td>[]</td><td>subscript operator. In Javascript and JSON it is the native array operator.</td>
         </tr>

         <tr>
         <td>[,]</td><td>Union operator in JSONPath allows alternate names or array indices as a set.</td>
         </tr>

         <tr>
         <td>[start:end:step]</td><td>array slice operator</td>
         </tr>

         <tr>
         <td>?()</td><td>applies a filter (script) expression.</td>
         </tr>

         <tr>
         <td>()</td><td>script expression, using the underlying script engine.</td>
         </tr>
         </table>

         <!--<h3>JSONPath example</h3> TODO - replace this w/ an example transaction & expressions applicable to that

         <p>
         The following is simple JSON structure representing a bookstore
         </p>

         <pre>
{
  "store": {
    "book": [
      { "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      { "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      { "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
         </pre>

         <table>
         <tr>
           <th>JSONPath</th><th>Result</th>
         </tr>

         <tr>
           <td>$.store.book[*].author</td><td>the authors of all books in the store</td>
         </tr>

         <tr>
           <td>$..author</td><td>all authors</td>
         </tr>

         <tr>
          <td>$.store.*</td><td>all things in store, which are some books and a red bicycle.</td>
         </tr>

         <tr>
           <td>$.store..price</td><td>the price of everything in the store.</td>
         </tr>

         <tr>
           <td>$..book[2]</td><td>the third book</td>
         </tr>

         <tr>
           <td>$..book[(@.length-1)] -or- $..book[-1:]</td><td>the last book in order.</td>
         </tr>

         <tr>
           <td>$..book[0,1] -or- $..book[:2]</td><td>the first two books</td>
         </tr>

         <tr>
           <td>$..book[?(@.isbn)]</td><td>filter all books with isbn number</td>
         </tr>

         <tr>
           <td>$..book[?(@.price&lt;10)]</td><td>filter all books cheapier than 10</td>
         </tr>

         <tr>
           <td>$..*</td><td>All members of JSON structure.</td>
         </tr>
        </table>-->

        <br/>

        <h3>Testing Expressions</h3>

        <p>
        On the <router-link to="/txs">Live Transactions</router-link> page you can build and test JSONPath expressions which are evaluated in real-time against the live transaction stream. Once you have an expression that meets your criteria, click the <b>Save Filter</b> button to be notified of matches.
        </p>

        <p>
        Saved filter expressions can be tested against a variety of pre-captured expressions by navigation to the <b>Filter Details Page</b> and clicking <b>Test Filter</b>.
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

export default {
  name: 'JSONPath',
  components: {
    MainLayout
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
}

#main_layout.md #jsonpath_content,
#main_layout.sm #jsonpath_content,
#main_layout.xs #jsonpath_content{
  padding: 5px;
}

tr{
  border: 1px solid black;
}

th, td{
  padding: 5px;
}
</style>
