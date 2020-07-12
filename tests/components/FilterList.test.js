describe("FilterList", () => {
  describe("dom", () => {
    test.todo("renders div each filter")

    describe(".filter_row", () => {
      describe("is_active_filter", () => {
        test.todo("is .active")
      })

      test.todo("renders total_matches")
    })
  })

  describe("methods", () => {
    describe("#is_active_filter", () => {
      describe("router path == /filter/filter.id", () => {
        test.todo("is true")
      })

      describe("router path == /test/filter.id", () => {
        test.todo("is true")
      })

      test.todo("is false")
    })
  })

  describe("#created", () => {
    test.todo("loads filters")
  })
})
