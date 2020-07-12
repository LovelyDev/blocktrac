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
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    test.todo("loads filter")
  })
})
