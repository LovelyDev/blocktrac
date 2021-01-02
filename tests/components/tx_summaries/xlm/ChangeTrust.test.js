describe("ChangeTrust", () => {
  describe("dom", () => {
    describe("mq >= md", () => {
      test.todo("renders issuer")
    })
  })

  describe("computed", () => {
    describe("#op", () => {
      test.todo("is operation.changeTrustOp")
    })

    describe("#alpha_num", () => {
      test.todo("is op.line.alphaNum4")
      test.todo("is op.line.alphaNum12")
    })

    describe("#asset", () => {
      test.todo("is alpha_num.assetCode")
    })

    describe("#issuer", () => {
      test.todo("is alpha_num.issuer.ed25519")
    })

    describe("#limit", () => {
      test.todo("is op.limit / STROOPS_PER_XLM")
    })
  })
})
