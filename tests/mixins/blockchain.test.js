describe("network mixin", () => {
  describe("computed", () => {
    describe("#configured_blockchain_upper", () => {
      test.todo("upper case version of the configured blockchain")
    })

    describe("#blockchain_configured", () => {
      describe("configured_blockchain is null", () => {
        test.todo("is false")
      })

      describe("configured_blockchain is not null", () => {
        test.todo("is true")
      })
    })

    describe("#no_blockchain_configured", () => {
      describe("configured_blockchain is null", () => {
        test.todo("is true")
      })

      describe("configured_blockchain is not null", () => {
        test.todo("is false")
      })
    })

    describe("#xrp_configured", () => {
      describe("configured_blockchain == 'xrp'", () => {
        test.todo("is true")
      })

      describe("configured_blockchain != 'xrp'", () => {
        test.todo("is false")
      })
    })

    describe("#xlm_configured", () => {
      describe("configured_blockchain == 'xlm'", () => {
        test.todo("is true")
      })

      describe("configured_blockchain != 'xlm'", () => {
        test.todo("is false")
      })
    })

    ///

    describe("#selected_blockchain", () => {
      test.todo("selected blockchain from store")
    })

    describe("#selected_blockchain_upper", () => {
      test.todo("selected blockchain upper case")
    })

    describe("#xrp_selected", () => {
      describe("selected_blockchain == 'xrp'", () => {
        test.todo("is true")
      })

      describe("selected_blockchain != 'xrp'", () => {
        test.todo("is false")
      })
    })

    describe("#xlm_selected", () => {
      describe("selected_blockchain == 'xlm'", () => {
        test.todo("is true")
      })

      describe("selected_blockchain != 'xlm'", () => {
        test.todo("is false")
      })
    })

    ///

    describe("#active_blockchain", () => {
      describe("blockchain configured", () => {
        test.todo("configured blockchain")
      })

      describe("no blockchain configured", () => {
        test.todo("selected blockchain")
      })
    })

    describe("#active_blockchain_upper", () => {
      test.todo("active_blockchain upper case")
    })

    describe("#xrp_active", () => {
      describe("active_blockchain == 'xrp'", () => {
        test.todo("is true")
      })

      describe("active_blockchain != 'xrp'", () => {
        test.todo("is false")
      })
    })

    describe("#xlm_active", () => {
      describe("active_blockchain == 'xlm'", () => {
        test.todo("is true")
      })

      describe("active_blockchain != 'xlm'", () => {
        test.todo("is false")
      })
    })

    ///

    describe("#blockchain_icon", () => {
      test.todo("is ../assets/currencies/active_blockchain_upper.svg")
    })

    describe("#blockchain_jsonpath_examples", () => {
      test.todo("is jsonpath_examples for active_blockchain")
    })

    describe("#blockchain_jsonpath_example", () => {
      test.todo("is first jsonpath_example for active_blockchain")
    })

    describe("#blockchain_description", () => {
      test.todo("is description for active blockchain")
    })

    describe("#blockchain_moreinfo", () => {
      test.todo("is moreinfo for active blockchain")
    })
  })
})
