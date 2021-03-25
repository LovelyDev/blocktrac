describe("Maintenance Page", () => {
  describe("computed", () => {
    describe("#img", () => {
      describe("no blockchain configured", () => {
        test.todo("is /assets/maintenance/blcokchain.svg")
      })

      describe("blockchain configured", () => {
        test.todo("is /assets/maintenance/configured_blockchain_upper.svg")
      })
    })
  })

  describe("#created", () => {
    describe("not MAINTENANCE_MODE", () => {
      test.todo("redirects to /txs")
    })
  })
})
