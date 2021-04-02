describe("FilterTester Page", () => {
  describe("dom", () => {
    describe("no matched_tests", () => {
      test.todo("renders no matches content")

      describe("#duplicate_link", () => {
        test.todo("launches duplicate_filter modal")
      })
    })

    test.todo("renders matches tests")
  })

  describe("watch", () => {
    describe("active_filter", () => {
      test.todo("applies filter jsonpath to tests and populates matched_tests")
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      test.todo("navs to maintenance")
    })

    test.todo("loads filter")
  })
})
