describe("TxsList", () => {
  describe("dom", () => {
    describe("mq <= md", () => {
      test.todo("renders TxsFilterControls")

      describe("logged_in", () => {
        test.todo("renders FilterListDowndown")
      })

      describe("!logged_in", () => {
        test.todo("renders 'Create Personalized Filter' button")

        describe("click event", () => {
          test.todo("launches create_filter modal")
        })
      })

      describe("remaining_filters > 0", () => {
        test.todo("renders '+ Add New Filter' button")

        test.todo("is .logged_in")

        describe("click event", () => {
          test.todo("launches create_filter modal")
        })
      })
    })

    describe("mq < md", () => {
      test.todo("renders TxsCategoriesDropdown")
    })

    describe("mq >= md", () => {
      test.todo("renders TxsCategories")
    })

    describe("have_txs", () => {
      test.todo("renders list-group")
    })

    describe("!have_txs", () => {
      test.todo("renders spinner")
    })
  })

  describe("computed", () => {
    describe("loading_txs", () => {
      test.todo("is store.loading_txs")
    })

    describe("txs", () => {
      test.todo("is store.txs")
    })

    describe("have_txs", () => {
      describe("txs.length != 0", () => {
        test.todo("is true")
      })

      describe("txs.length == 0", () => {
        test.todo("is false")
      })
    })
  })

  describe("watch", () => {
    describe("active_blockchain", () => {
      test.todo("clears txs")
      test.todo("removes stream_txs connection callback")
      test.todo("adds stream_txs connection callback")
    })
  })

  describe("methods", () => {
    describe("message callback", () => {
      test.todo("adds tx")
    })
  })

  describe("#created", () => {
    test.todo("adds stream_txs connection callback")
  })

  describe("#destroyed", () => {
    test.todo("removes stream_txs connection callback")
    test.todo("stops streaming txs")
  })
})
