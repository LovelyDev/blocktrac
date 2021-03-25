describe("network mixin", () => {
  describe("computed", () => {
    describe("#no_network_configured", () => {
      describe("configured network is null", () => {
        test.todo("is true")
      })

      describe("configured network is not null", () => {
        test.todo("is false")
      })
    })

    describe("#active_network", () => {
      describe("no network configured", () => {
        test.todo("is default network for active blockchain")
      })

      describe("network configured", () => {
        test.todo("is configured network")
      })
    })

    describe("#active_network_uri", () => {
      test.todo("uri for the active network")
    })
  })
})
