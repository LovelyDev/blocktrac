describe("tx_summaries xlm meta mixin", () => {
  describe("computed", () => {
    describe("#hash", () => {
      test.todo("is tx.hash")
    })

    describe("#account", () => {
      test.todo("is tx.source_account")
    })

    describe("#tx_result", () => {
      test.todo("is tx.result.result._type")
    })

    describe("#success", () => {
      describe("tx_result == 'txSuccess'", () => {
        test.todo("is true")
      })

      describe("tx_result != 'txSuccess'", () => {
        test.todo("is false")
      })
    })

    describe("#operations", () => {
      test.todo("returns all tx operations")
    })

    describe("#operation_types", () => {
      test.todo("returns all operations types")
    })

    describe("#humanized_operation_types", () => {
      test.todo("is operation types inflected to underscore inflected to camel2words")
    })

    describe("#operation", () => {
      test.todo("is prioritized operation")
    })

    describe("#operation_type", () => {
      test.todo("is type of operation")
    })

    describe("#short_operation_type", () => {
      describe("operation type starts with 'paymentPath'", () => {
        test.todo("is PaymentPath")
      })

      describe("operation type ends with 'Offer'", () => {
        test.todo("is Offer")
      })

      test.todo("is camelized operation type")
    })

    describe("#multiple_operations", () => {
      describe("operations.length > 1", () => {
        test.todo("is true")
      })

      describe("operations.length <= 1", () => {
        test.todo("is false")
      })
    })

    describe("#tx_category", () => {
      test.todo("is tx category for operation type")
    })

    describe("#created_at", () => {
      test.todo("is parsed tx.created_at")
    })

    describe("#formatted_date", () => {
      test.todo("formats created_at")
    })
  })
})
