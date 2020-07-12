describe("FilterDetails Page", () => {
  describe("dom", () => {
    describe("no filter_matches", () => {
      test.todo("renders no matches content")


      describe("#notifications_text", () => {
        describe("filter associated with sinks", () => {
          test.todo("renders sinks")
        })
      })
    })

    describe("#matched_txs_explanation", () => {
      describe("total_matches > match_history", () => {
        test.todo("renders match_history text")
      })
    })

    test.todo("renders filter matches")
  })

  describe("computed", () => {
    describe("#have_sinks", () => {
      describe("no active filter", () => {
        test.todo("is false")
      })

      describe("no active filter sinks (falsy)", () => {
        test.todo("is false")
      })

      describe("no active filter sinks (.length == 0)", () => {
        test.todo("is false")
      })

      describe("active filter associated with sinks", () => {
        test.todo("is true")
      })
    })

    describe("#sinks_text", () => {
      test.todo("is comma seperated list of filter sinks' types/targets")
    })

    describe("#match_history", () => {
      test.todo("is config filter_match_history")
    })
  })

  describe("watch", () => {
    describe("route", () => {
      test.todo("loads filter")
      test.todo("loads filter matches")
    })
  })

  describe("#created", () => {
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    test.todo("loads filter")
    test.todo("loads filter matches")
  })
})
