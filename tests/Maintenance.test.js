describe("Maintenance Page", () => {
  describe("computed", () => {
    describe("img", () => {
      describe("no blockchain configured", () => {
        test.todo("is /assets/maintenance/blockchain.svg")
      })

      describe("blockchain configured", () => {
        test.todo("is /assets/maintenance/configured_blockchain_upper.svg")
      })
    })
  })

  describe("#created", () => {
    describe("not maintenance_mode", () => {
      test.todo("redirects to /txs")
    })
  })
})
