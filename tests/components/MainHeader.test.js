describe("MainHeader", () => {
  describe("dom", () => {
    describe("landing page", () => {
      test.todo("does not render BlockchainSelector")
    })

    describe("blockchain is configured", () => {
      test.todo("does not render BlockchainSelector")
    })

    describe("not landing page and blockchain is not configured", () => {
      test.todo("renders BlockchainSelector")
    })

    describe("mq < lg", () => {
      test.todo("renders hamburger nav")
      test.todo("does not render main nav")
    })

    describe("mq >= lg", () => {
      test.todo("does not render hamburger menu")
      test.todo("renders main nav")
    })
  })

  describe("computed", () => {
    describe("#is_landing", () => {
      describe("path == '/'", () => {
        test.todo("is true")
      })

      describe("path != '/'", () => {
        test.todo("is false")
      })
    })
  })
})
