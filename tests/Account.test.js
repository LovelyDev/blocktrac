describe("Account Page", () => {
  describe("dom", () => {
    describe("#back_icon", () => {
      describe("clicked", () => {
        test.todo("navigates back")
      })
    })

    describe("#account_id", () => {
      test.todo("contains id")
    })

    describe("#account_table > tr:nth-child(0) > .value", () => {
      test.todo("contains rounded, deliminated balance")
    })

    describe("#account_table > tr:nth-child(1) > .value", () => {
      test.todo("contains sequence")
    })

    describe("#account_table > tr:nth-child(2) > .value", () => {
      test.todo("contains link to previous txn")
    })
  })

  describe("methods", () => {
    describe("#on_account", () => {
      test.todo("sets balance")
      test.todo("sets sequence")
      test.todo("sets previous_txn")
    })
  })

  describe("#created", () => {
    test.todo("retrieves network account")
  })
})
