describe("has_tx", () => {
  describe("computed", () => {
    describe("#tx_obj", () => {
      test.todo("is tx['transaction']")
      test.todo("is tx['tx']")
    })

    describe("#tx_meta", () => {
      test.todo("is tx['meta']")
    })

    describe("#affected_nodes", () => {
      test.todo("is tx_meta['AffectedNodes']")
    })

    describe("#tx_type", () => {
      test.todo("is tx_obj['TransactionType']")
    })

    describe("#tx_short_type", () => {
      test.todo("is tx_type")

      describe("tx_type includes 'PaymentChannel'", () => {
        test.todo("replaces 'PaymentChannel' with 'PayChan'")
      })
    })

    describe("#hash", () => {
      test.todo("is tx_obj['hash']")
    })

    describe("#account", () => {
      test.todo("is tx_obj['Account']")
    })

    describe("#tx_category", () => {
      test.todo("is tx category for tx_type")
    })

    describe("#tx_result", () => {
      test.todo("is tx_meta['TransactionResult']")
    })

    describe("#success", () => {
      describe("tx_result == 'tesSUCCESS'", () => {
        test.todo("is true")
      })

      describe("tx_result != 'tesSUCCESS'", () => {
        test.todo("is false")
      })
    })

    describe("#unix_date", () => {
      describe("tx_obj['date'] is string", () => {
        test.todo("parses date")
      })

      test.todo("converts tx_obj['date'] from ledger time to unix")
    })

    describe("#formatted_date", () => {
      test.todo("formats unix_date as YYYY-MM-DD HH:mm:ss")
    })
  })

  describe("methods", () => {
    describe("#created_nodes", () => {
      test.todo("returns created_nodes for given type")
    })

    describe("#created_node", () => {
      test.todo("returns first created_node for given type")
    })

    describe("#created_fields", () => {
      test.todo("returns NewFields for created_node of given type")
    })

    describe("#modified_nodes", () => {
      test.todo("returns modified_nodes for given type")
    })

    describe("#modified_node", () => {
      test.todo("returns first modified_node for given type")
    })

    describe("#modfied_fields", () => {
      test.todo("returns FinalFields for modified_node of given type")
    })

    describe("#deleted_nodes", () => {
      test.todo("returns deleted_nodes for given type")
    })

    describe("#deleted_node", () => {
      test.todo("returns first deleted_node for given type")
    })

    describe("#deleted_fields", () => {
      test.todo("returns FinalFields for modified_node of given type")
    })
  })
})
