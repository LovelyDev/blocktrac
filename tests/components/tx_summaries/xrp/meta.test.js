describe("tx_summaries xrp meta mixin", () => {
  describe("computed", () => {
    describe("#tx_obj", () => {
      test.todo("is tx['transaction']")
      test.todo("is tx['tx']")
    })

    describe("#tx_meta", () => {
      test.todo("is tx['meta']")
    })

    describe("#affected_notes", () => {
      test.todo("is tx_meta['AffectedNodes']")
    })

    describe("#tx_type", () => {
      test.todo("is tx_obj['TransactionType']")
    })

    describe("#tx_short_type", () => {
      test.todo("replaces tx_type 'PaymentChannel' with 'PayChan'")
    })

    describe("#hash", () => {
      test.todo("is tx_obj['hash']")
    })

    describe("#account", () => {
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
      describe("tx_obj['date'] is a string", () => {
        test.todo("parses tx_obj['date']")
      })

      test.todo("converts tx_obj['date'] from ledger time to unix time")
    })

    describe("#formatted_date", () => {
      test.todo("formats unix_date")
    })
  })

  describe("methods", () => {
    describe("#created_nodes", () => {
      test.todo("is created affected_nodes of specified type")
    })

    describe("#created_node", () => {
      test.todo("is first created node")
    })

    describe("created_fields", () => {
      test.todo("is new fields of created node")
    })

    describe("modified_nodes", () => {
      test.todo("is modified affected_nodes of specified type")
    })

    describe("#modified_node", () => {
      test.todo("is first modified node")
    })

    describe("modified_fields", () => {
      test.todo("is final fields of modified node")
    })

    describe("deleted_nodes", () => {
      test.todo("is deleted affected_nodes of specified type")
    })

    describe("#deleted_node", () => {
      test.todo("is first deleted node")
    })

    describe("deleted_fields", () => {
      test.todo("is final fields of deleted node")
    })
  })
})
