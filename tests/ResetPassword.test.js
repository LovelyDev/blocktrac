describe("ResetPassword Page", () => {
  describe("dom", () => {
    describe("reset password form", () => {
      describe("validated event", () => {
        test.todo("validates")
      })

      describe("submit event", () => {
        test.todo("submits")
      })
    })

    describe("reset button", () => {
      describe("clicked", () => {
        test.todo("submits")
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      describe("not valid", () => {
        test.todo("does nothing, just returns")
      })

      test.todo("submits reset_password request")

      describe("successful response", () => {
        test.todo("alerts success")
        test.todo("redirects to /txs")
      })

      describe("failed response", () => {
        test.todo("alerts err")
        test.todo("redirects to /txs")
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      test.todo("navs to maintenance")
    })
  })
})
