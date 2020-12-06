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
           Expressions can use <b>dot-notation</b> (<i>{{dot_notation}}</i>)
           or <b>bracket-notation</b> (<i>{{bracket_notation}}</i>)
           for input paths.
         </p>

         <p>
           JSONPath allows the wildcard symbol <b>*</b> for member names and array indices.
         </p>

         <p>
           <b>Script expressions</b> can be used as an alternative to explicit names or indices as in: <i>{{script_expression}}</i>,
           using the symbol <b>@</b> for the current object.
         </p>

         <p>
           Filter expressions are supported via the syntax <b>?(&lt;boolean expr&gt;)</b> as in: <i>{{filter_expression}}</i>
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
           Before processing, {{app_name}} wraps all XRP transactions in the following top level object:

           <br v-if="mq_xs" />

           <span id="transaction_wrapper_text">
             <b>{ transaction : &lt;actual transaction&gt; }</b>
           </span>
         </b-alert>

         <renderjson :data="txs[network]" level="4" />

         <table id="example_table">
         <tr>
           <th>JSONPath</th><th>Result</th>
         </tr>

         <tr v-for="example in examples[network]" :key="example.id">
           <td v-html="example.syntax"></td>
           <td v-html="example.description"></td>
         </tr>

         <tr>
           <td>$..*</td><td>All members of the JSON structure.</td>
         </tr>
        </table>

        <br/>

        <h3 id="gotchyas">Common Gotchyas</h3>

        <ul>
          <li>{{app_name}} wraps transactions in a top level <b>transaction</b> object. Make sure to incoporate this into your JSONPath expression and/or use the recursive descent operator: <b>..</b></li>
          <li v-if="is_xrp">Transactions returned by a XRPL server are in different formats depending on context. Transactions which are sent to clients in the <b>transaction stream</b> have <b>transaction</b> and <b>meta</b> objects (see the example above) whereas those returned by the <a href="https://xrpl.org/tx.html#response-format"><b>tx command</b></a> embed the <b>meta</b> object <b>and</b> transaction fields in a top level <b>result</b> object. <b>Zerp tracker runs filter expressions against transaction stream transcations</b></li>
          <li>Make sure to check for typos and structural inconsistencies against actual {{network_upper}} data</li>
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
import Network    from './mixins/network'

import renderjson from './vendor/renderjson/renderjson.vue'

export default {
  name: 'JSONPath',

  mixins : [Network],

  components: {
    MainLayout,
    renderjson
  },

  data : function(){
    return {
      txs : {
        xrp : {
          transaction : {
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
        }, xlm : {
          transaction : {
            "id": "9f20f040817cc74c01075482cafd2847e49fcf182894c5f44cc83aa7f2ba4312",
            "paging_token": "141527702208253952",
            "successful": true,
            "hash": "9f20f040817cc74c01075482cafd2847e49fcf182894c5f44cc83aa7f2ba4312",
            "created_at": "2020-12-06T18:21:13Z",
            "source_account": "GC7GOPACWH7PF5B6WL7US4FVKBZWHDQLHMPKNDX76ZI6NFXBPI52GA22",
            "source_account_sequence": "118412424447497428",
            "fee_account": "GC7GOPACWH7PF5B6WL7US4FVKBZWHDQLHMPKNDX76ZI6NFXBPI52GA22",
            "fee_charged": "600",
            "max_fee": "6000",
            "operation_count": 6,
            "envelope_xdr": "AAAAAgAAAAC+ZzwCsf7y9D6y/0lwtVBzY44LOx6mjv/2UeaW4Xo7owAAF3ABpK95AC+U1AAAAAEAAAAAAAAAAAAAAABfzSE2AAAAAAAAAAYAAAAAAAAADAAAAAFCVEMAAAAAACk6YxqZ1l/IyJjKy6a4PtZxyYYgFSDTXvs0r4N27zYlAAAAAAAAAAAAAAAAAAAAAQAAJxAAAAAAFuv81wAAAAAAAAAMAAAAAUJUQwAAAAAAKTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiUAAAAAAAAAAAAAAAAAAAABAAAnEAAAAAAW6/zYAAAAAAAAAAwAAAABQlRDAAAAAAApOmMamdZfyMiYysumuD7WccmGIBUg0177NK+Ddu82JQAAAAAAAAAAAAAAAAAAAAEAACcQAAAAABbr/NkAAAAAAAAAAwAAAAAAAAABQlRDAAAAAAApOmMamdZfyMiYysumuD7WccmGIBUg0177NK+Ddu82JQAAAAEMIAJUAABAgmzpJ9MAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAFCVEMAAAAAACk6YxqZ1l/IyJjKy6a4PtZxyYYgFSDTXvs0r4N27zYlAAAAASxCQyAAAECCbOkn0wAAAAAAAAAAAAAAAAAAAAwAAAABQlRDAAAAAAApOmMamdZfyMiYysumuD7WccmGIBUg0177NK+Ddu82JQAAAAAAAAAAAATstgAAHQIxtwiTAAAAAAAAAAAAAAAAAAAAAeF6O6MAAABAWJsZye2lT6uzBjKRV4XYg3qjvy4uNGi7fBQ8X+CbkR0aEVF2xO5oCkYAkCE/z+kJMPWw7wlYY8gZgT4a3JrfCw==",
            "result_xdr": "AAAAAAAAAlgAAAAAAAAABgAAAAAAAAAMAAAAAAAAAAAAAAACAAAAAAAAAAwAAAAAAAAAAAAAAAIAAAAAAAAADAAAAAAAAAAAAAAAAgAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAL5nPAKx/vL0PrL/SXC1UHNjjgs7HqaO//ZR5pbhejujAAAAABbr/QIAAAAAAAAAAUJUQwAAAAAAKTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiUAAAABDB88+gAAQIJs6SfTAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAC+ZzwCsf7y9D6y/0lwtVBzY44LOx6mjv/2UeaW4Xo7owAAAAAW6/0DAAAAAAAAAAFCVEMAAAAAACk6YxqZ1l/IyJjKy6a4PtZxyYYgFSDTXvs0r4N27zYlAAAAASxAzcQAAECCbOkn0wAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAvmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6MAAAAAFuv9BAAAAAFCVEMAAAAAACk6YxqZ1l/IyJjKy6a4PtZxyYYgFSDTXvs0r4N27zYlAAAAAAAAAAAAAAACMbcIkwAAHQIAAAAAAAAAAAAAAAA=",
            "result_meta_xdr": "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",
            "fee_meta_xdr": "AAAAAgAAAAMB9s6xAAAAAAAAAAC+ZzwCsf7y9D6y/0lwtVBzY44LOx6mjv/2UeaW4Xo7owAAAAI/od4gAaSveQAvlNMAAAAEAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAAADbX0AAAACN+gndgAAAAAAAAAAAAAAAQH2zrIAAAAAAAAAAL5nPAKx/vL0PrL/SXC1UHNjjgs7HqaO//ZR5pbhejujAAAAAj+h28gBpK95AC+U0wAAAAQAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAAAAANtfQAAAAI36Cd2AAAAAAAAAAA=",
            "memo_type": "none",
            "signatures": [
              "WJsZye2lT6uzBjKRV4XYg3qjvy4uNGi7fBQ8X+CbkR0aEVF2xO5oCkYAkCE/z+kJMPWw7wlYY8gZgT4a3JrfCw=="
            ],
            "valid_after": "1970-01-01T00:00:00Z",
            "valid_before": "2020-12-06T18:21:42Z",
            "ledger_attr": 32951986,
            "envelope": {
              "_type": "envelopeTypeTx",
              "v1": {
                "tx": {
                  "sourceAccount": {
                    "_type": "keyTypeEd25519",
                    "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                  },
                  "fee": 6000,
                  "seqNum": "118412424447497428",
                  "timeBounds": {
                    "minTime": "0",
                    "maxTime": "1607278902"
                  },
                  "memo": {
                    "_type": "memoNone"
                  },
                  "operations": [
                    {
                      "body": {
                        "_type": "manageBuyOffer",
                        "manageBuyOfferOp": {
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "buyAmount": "0",
                          "price": {
                            "n": 1,
                            "d": 10000
                          },
                          "offerId": "384564439"
                        }
                      }
                    },
                    {
                      "body": {
                        "_type": "manageBuyOffer",
                        "manageBuyOfferOp": {
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "buyAmount": "0",
                          "price": {
                            "n": 1,
                            "d": 10000
                          },
                          "offerId": "384564440"
                        }
                      }
                    },
                    {
                      "body": {
                        "_type": "manageBuyOffer",
                        "manageBuyOfferOp": {
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "buyAmount": "0",
                          "price": {
                            "n": 1,
                            "d": 10000
                          },
                          "offerId": "384564441"
                        }
                      }
                    },
                    {
                      "body": {
                        "_type": "manageSellOffer",
                        "manageSellOfferOp": {
                          "selling": {
                            "_type": "assetTypeNative"
                          },
                          "buying": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "amount": "4498391636",
                          "price": {
                            "n": 16514,
                            "d": 1827219411
                          },
                          "offerId": "0"
                        }
                      }
                    },
                    {
                      "body": {
                        "_type": "manageSellOffer",
                        "manageSellOfferOp": {
                          "selling": {
                            "_type": "assetTypeNative"
                          },
                          "buying": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "amount": "5037507360",
                          "price": {
                            "n": 16514,
                            "d": 1827219411
                          },
                          "offerId": "0"
                        }
                      }
                    },
                    {
                      "body": {
                        "_type": "manageBuyOffer",
                        "manageBuyOfferOp": {
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "QlRDAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "buyAmount": "322742",
                          "price": {
                            "n": 7426,
                            "d": 834078867
                          },
                          "offerId": "0"
                        }
                      }
                    }
                  ],
                  "ext": {
                    "_type": 0
                  }
                },
                "signatures": [
                  {
                    "hint": "4Xo7ow==",
                    "signature": "WJsZye2lT6uzBjKRV4XYg3qjvy4uNGi7fBQ8X+CbkR0aEVF2xO5oCkYAkCE/z+kJMPWw7wlYY8gZgT4a3JrfCw=="
                  }
                ]
              }
            },
            "result_meta": {
              "_type": 2,
              "v2": {
                "txChangesBefore": [
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32951986,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                          },
                          "balance": "9657506760",
                          "seqNum": "118412424447497427",
                          "numSubEntries": 4,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "224637",
                                "selling": "9527895926"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryUpdated",
                    "updated": {
                      "lastModifiedLedgerSeq": 32951986,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                          },
                          "balance": "9657506760",
                          "seqNum": "118412424447497428",
                          "numSubEntries": 4,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "224637",
                                "selling": "9527895926"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  }
                ],
                "operations": [
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951985,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564439",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "4490484703",
                              "price": {
                                "n": 3788,
                                "d": 419129609
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryRemoved",
                        "removed": {
                          "_type": "offer",
                          "offer": {
                            "sellerId": {
                              "_type": "publicKeyTypeEd25519",
                              "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                            },
                            "offerId": "384564439"
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951985,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "86111",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "45527",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 4,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "9527895926"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 3,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "5037411223"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951985,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564440",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "5037411223",
                              "price": {
                                "n": 3788,
                                "d": 419129609
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryRemoved",
                        "removed": {
                          "_type": "offer",
                          "offer": {
                            "sellerId": {
                              "_type": "publicKeyTypeEd25519",
                              "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                            },
                            "offerId": "384564440"
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "45527",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 3,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "5037411223"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 2,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951985,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564441",
                              "selling": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "buying": {
                                "_type": "assetTypeNative"
                              },
                              "amount": "2",
                              "price": {
                                "n": 437032216,
                                "d": 3891
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryRemoved",
                        "removed": {
                          "_type": "offer",
                          "offer": {
                            "sellerId": {
                              "_type": "publicKeyTypeEd25519",
                              "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                            },
                            "offerId": "384564441"
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 2,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 1,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 1,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 2,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "4498341114"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "40655",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryCreated",
                        "created": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564482",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "4498341114",
                              "price": {
                                "n": 16514,
                                "d": 1827219411
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 2,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "4498341114"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 3,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "9535752894"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "40655",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "86182",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryCreated",
                        "created": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564483",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "5037411780",
                              "price": {
                                "n": 16514,
                                "d": 1827219411
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    "changes": [
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 3,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "0",
                                    "selling": "9535752894"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "account",
                            "account": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "balance": "9657506760",
                              "seqNum": "118412424447497428",
                              "numSubEntries": 4,
                              "flags": 0,
                              "homeDomain": "",
                              "thresholds": "AQAAAA==",
                              "signers": [],
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "224637",
                                    "selling": "9535752894"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryState",
                        "state": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "86182",
                                    "selling": "0"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryUpdated",
                        "updated": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "trustline",
                            "trustLine": {
                              "accountId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "asset": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "balance": "1082",
                              "limit": "9223372036854775000",
                              "flags": 1,
                              "ext": {
                                "_type": 1,
                                "v1": {
                                  "liabilities": {
                                    "buying": "86182",
                                    "selling": "2"
                                  },
                                  "ext": {
                                    "_type": 0
                                  }
                                }
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      {
                        "_type": "ledgerEntryCreated",
                        "created": {
                          "lastModifiedLedgerSeq": 32951986,
                          "data": {
                            "_type": "offer",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564484",
                              "selling": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "buying": {
                                "_type": "assetTypeNative"
                              },
                              "amount": "2",
                              "price": {
                                "n": 834078867,
                                "d": 7426
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    ]
                  }
                ],
                "txChangesAfter": []
              }
            },
            "result": {
              "feeCharged": "600",
              "result": {
                "_type": "txSuccess",
                "results": [
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageBuyOffer",
                      "manageBuyOfferResult": {
                        "_type": "manageBuyOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferDeleted"
                          }
                        }
                      }
                    }
                  },
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageBuyOffer",
                      "manageBuyOfferResult": {
                        "_type": "manageBuyOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferDeleted"
                          }
                        }
                      }
                    }
                  },
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageBuyOffer",
                      "manageBuyOfferResult": {
                        "_type": "manageBuyOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferDeleted"
                          }
                        }
                      }
                    }
                  },
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageSellOffer",
                      "manageSellOfferResult": {
                        "_type": "manageSellOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferCreated",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564482",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "4498341114",
                              "price": {
                                "n": 16514,
                                "d": 1827219411
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageSellOffer",
                      "manageSellOfferResult": {
                        "_type": "manageSellOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferCreated",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564483",
                              "selling": {
                                "_type": "assetTypeNative"
                              },
                              "buying": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "amount": "5037411780",
                              "price": {
                                "n": 16514,
                                "d": 1827219411
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    "_type": "opInner",
                    "tr": {
                      "_type": "manageBuyOffer",
                      "manageBuyOfferResult": {
                        "_type": "manageBuyOfferSuccess",
                        "success": {
                          "offersClaimed": [],
                          "offer": {
                            "_type": "manageOfferCreated",
                            "offer": {
                              "sellerId": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "vmc8ArH+8vQ+sv9JcLVQc2OOCzsepo7/9lHmluF6O6M="
                              },
                              "offerId": "384564484",
                              "selling": {
                                "_type": "assetTypeCreditAlphanum4",
                                "alphaNum4": {
                                  "assetCode": "QlRDAA==",
                                  "issuer": {
                                    "_type": "publicKeyTypeEd25519",
                                    "ed25519": "KTpjGpnWX8jImMrLprg+1nHJhiAVINNe+zSvg3bvNiU="
                                  }
                                }
                              },
                              "buying": {
                                "_type": "assetTypeNative"
                              },
                              "amount": "2",
                              "price": {
                                "n": 834078867,
                                "d": 7426
                              },
                              "flags": 0,
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "ext": {
                "_type": 0
              }
            }
          }
        }
      }
    }
  },

  computed : {
    dot_notation: function(){
      return this.is_xrp ? "$.transaction.transaction.Paths[0][0].currency"  :
             this.is_xlm ? "$.transaction.envelope.v1.tx.operations[0].body._type" :
                           "" ;
    },

    bracket_notation: function(){
      return this.is_xrp ? "$['transaction']['transaction']['Paths'][0][0]['currency']" :
             this.is_xlm ? "$['transaction']['envelope']['v1']['tx']['operations'][0]['body']['_type']" :
                           "" ;
    },

    script_expression: function(){
      return this.is_xrp ? "$.transaction.transaction.Paths[(@.length-1)][0].issuer" :
             this.is_xlm ? "$.transaction.envelope.v1.tx.operations[(@.length-1)].body._type" :
                           "" ;
    },

    filter_expression: function(){
      return this.is_xrp ? "$.transaction.transaction.TakerGets[?(@.currency == 'CNY')]" :
             this.is_xlm ? "$.transaction.envelope.v1.tx[?(@.operations.length > 1)]" :
                           "" ;
    },

    xrp_examples : function(){
      return [{
                   id : "transaction_type",
               syntax : "$.transaction.transaction.TransactionType",
          description : "The transaction type: <b>OfferCreate</b>"

        }, {
                   id : "transaction_account",
               syntax : "$.transaction.transaction.Account",
          description : "The sending account: <b>r3rhWeE31Jt5sWmi4QiGLMZnY3ENgqw96W</b>"

        }, {
                   id : "affected_nodes",
               syntax : "$.transaction.meta.AffectedNodes.*",
          description : "All affected nodes"

        }, {
                   id : "third_node",
               syntax : "$..AffectedNodes[2]",
          description : "The third node"

        }, {
                   id : "last_node",
               syntax : "$..AffectedNodes[(@.length-1)] <b>-or-</b> $..AffectedNodes[-1:]",
          description : "The last node"

        }, {
                   id : "transaction_type_and_result",
               syntax : "$[?(@.transaction.TransactionType == 'OfferCreate' && @.meta.TransactionResult == 'tesSUCCESS')]",
          description : "Filter by transaction type and result"
      }]
    },

    xlm_examples : function(){
      return [{
                   id : "source_account",
               syntax : "$..[?(@.source_account == 'GC7GOPACWH7PF5B6WL7US4FVKBZWHDQLHMPKNDX76ZI6NFXBPI52GA22')]",
          description : "The source account: <b>GC7GOPACWH7PF5B6WL7US4FVKBZWHDQLHMPKNDX76ZI6NFXBPI52GA22</b>"

        }, {
                   id : "operations",
               syntax : "$.transaction.envelope.v1.tx.operations",
          description : "All operations"

        }, {
                   id : "third_operation",
               syntax : "$.transaction.envelope.v1.tx.operations[2]",
          description : "The third operation"

        }, {
                   id : "last_operation",
               syntax : "$.transaction.envelope.v1.tx.operations[(@.length-1)] <b>-or-</b> $.transaction.envelope.v1.tx.operations[-1:]",
          description : "The last operation"

        }, {
                   id : "usd_payments",
               syntax : "$.transaction.envelope.v1.tx.operations..[?(@._type == 'payment' && @.paymentOp.asset.alphaNum4.assetCode == 'USD')]",
          description : "Payments in USD"
      }]
    },

    examples : function(){
      return {
        xrp : this.xrp_examples,
        xlm : this.xlm_examples
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
