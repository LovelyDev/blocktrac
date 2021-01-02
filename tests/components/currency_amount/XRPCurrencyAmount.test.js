describe("XRPCurrencyAmount", () => {
  describe("dom", () => {
    describe("drops", () => {
      test.todo("renders xrp amount")

      describe("no amount", () => {
        test.todo("does not render amount")
      })
    })

    describe("iou", () => {
      test.todo("renders amount")

      describe("no amount", () => {
        test.todo("does not render amount")
      })

      test.todo("renders currency icon")

      test.todo("renders issuer link")

      describe("no issuer", () => {
        test.todo("does not render issuer")
      })
    })
  })

  describe("#computed", () => {
    describe("#is_drops", () => {
      describe("typeof amount is a string", () => {
        test.todo("is true")
      })

      describe("typeof amount is a number", () => {
        test.todo("is true")
      })

      describe("typeof amount is not a string or number", () => {
        test.todo("is false")
      })
    })

    describe("#is_iou", () => {
      test.todo("equals !is_drops")
    })

    describe("xrp amount", () => {
      test.todo("divides amount by DROPS_PER_XRP")
    })
  })
})
