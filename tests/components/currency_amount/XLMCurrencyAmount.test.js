describe("XLMCurrencyAmount", () => {
  describe("dom", () => {
    describe("native", () => {
      test.todo("renders xlm amount")

      describe("no amount", () => {
        test.todo("does not render amount")
      })
    })

    describe("not native", () => {
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
    describe("#have_amount", () => {
      describe("!!amount", () => {
        test.todo("is true")
      })

      describe("amount == 0", () => {
        test.todo("is true")
      })

      describe("!amount && amount != 0", () => {
        test.todo("is false")
      })
    })

    describe("#is_native", () => {
      describe("currency type == assetTypeNative", () => {
        test.todo("is true")
      })

      describe("currency type != assetTypeNative", () => {
        test.todo("is false")
      })
    })

    describe("#simple_currency", () => {
      describe("typeof(currency) == string", () => {
        test.todo("is true")
      })

      describe("typeof(currency) != string", () => {
        test.todo("is false")
      })
    })

    describe("#alpha_num", () => {
      describe("currency.alphaNum4", () => {
        test.todo("is true")
      })

      describe("currency.alphaNum12", () => {
        test.todo("is true")
      })

      describe("!currency.alphaNum4 && !currency.alphaNum12", () => {
        test.todo("is false")
      })
    })

    describe("#asset_code", () => {
      describe("simple_currency", () => {
        test.todo("is currency")
      })

      describe("!simple_currency", () => {
        test.todo("is alpha_num.assetCode")
      })
    })

    describe("#issuer", () => {
      test.todo("is alpha_num.issuer.ed25519")
    })
  })
})
