describe("TxsLayout", () => {
  describe("dom", () => {
    describe("#txs_title", () => {
      test.todo("renders title")
    })

    describe("#txs_sidebar_container", () => {
      describe("mq > md", () => {
        test.todo("is rendered")
      })
    })
  })

  describe("computed", () => {
    describe("#account", () => {
      describe("section == 'account'", () => {
        test.todo("is true")
      })

      describe("section != 'account'", () => {
        test.todo("is false")
      })
    })

    describe("#notifications", () => {
      describe("section == 'notifications'", () => {
        test.todo("is true")
      })

      describe("section == 'notification'", () => {
        test.todo("is true")
      })

      describe("section != 'notifications' && section != 'notification'", () => {
        test.todo("is false")
      })
    })

    describe("#account", () => {
      describe("section == 'txs'", () => {
        test.todo("is true")
      })

      describe("section != 'txs'", () => {
        test.todo("is false")
      })
    })

    describe("#title", () => {
      describe("account section", () => {
        test.todo("is 'Accounts'")
      })

      describe("notifications section", () => {
        test.todo("is 'Notifications'")
      })

      describe("live section", () => {
        test.todo("is 'Live Transactions'")
      })

      describe("other section", () => {
        test.todo("is 'Transactions'")
      })
    })
  })
})
