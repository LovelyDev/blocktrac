describe("Tx Page", () => {
  describe("dom", () => {
    describe("#tx_hash", () => {
      test.todo("is tx hash")
    })
  })

  describe("computed", () => {
    describe("#has_tx", () => {
      describe("tx is set", () => {
        test.todo("is true")
      })

      describe("tx is not set", () => {
        test.todo("is false")
      })
    })
  })

  describe("methods", () => {
    describe("msg_cb", () => {
      describe("message result is not set", () => {
        test.todo("does nothing, just returns")
      })

      describe("message result meta is not set", () => {
        test.todo("does nothing, just returns")
      })
    })
  })

  describe("#created", () => {
    test.todo("registers socket message callback")
    test.todo("registers socket open callback")
    test.todo("sends tx command")
  })

  describe("#destroyed", () => {
    test.todo("unregisters socket message callback")
  })
})
