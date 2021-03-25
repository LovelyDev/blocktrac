describe("xlm network-connection module", () => {
  describe("#reset", () => {
    test.todo("stops streaming transactions")
    test.todo("sets connected to false")

    describe("#connect", () => {
      test.todo("initializes stellar server")
      test.todo("tests connection")
      test.todo("starts test connection interval")
    })

    describe("#test_connection", () => {
      test.todo("fetches base fee from stellar server")
      describe("on base fee fetched", () => {
        test.todo("sets connected to true")
        test.todo("calls connected callbacks")
      })

      describe("error fetching base fee", () => {
        test.todo("sets connected to false")
        test.todo("calls disconnected callbacks")
      })
    })

    describe("#validate_address", () => {
      test.todo("returns StellarSdk.StrKey.isValidEd25519PublicKey")
    })

    describe("#retrieve_account", () => {
      test.todo("retrieves account from stellar server")
      test.todo("retrieves latest transaction from stellar server")
      describe("on retrieval", () => {
        test.todo("creates account object")
        test.todo("sets balance on account object")
        test.todo("sets sequence on account object")
        test.todo("sets previous_txn on account object")
        test.todo("invokes callback with account object")
      })
    })

    describe("#retrieve_tx", () => {
      test.todo("retrieves tx from stellar server")
      describe("on retrieval", () => {
        test.todo("invokes callback with wrapped converted tx")
      })
    })

    describe("#stream_txs", () => {
      test.todo("calls txs callback to stop streaming")
      test.todo("streams transactions from stellar server")
      describe("message callback", () => {
        test.todo("wraps and converts tx")
        test.todo("sets category on wrapped tx")
        test.todo("sets hash on wrapped tx")
        test.todo("freezes wrapped tx")
        test.todo("invokes callback with wrapped tx")
      })
    })

    describe("#stop_streaming_tx", () => {
      test.todo("calls txs callback")
      test.todo("nullifies txs callback")
    })
  })
})
