describe("Profile Page", () => {
  describe("dom", () => {
    describe("profile form", () => {
      describe("editing", () => {
        test.todo("enable_controls = true")
      })

      describe("not editing", () => {
        test.todo("enable_controls = false")
      })

      describe("validated event", () => {
        test.todo("validates")
      })
    })

    describe("controls wrapper", () => {
      describe("controls are enabled", () => {
        test.todo("is rendered")
      })

      describe("controls are not enabled", () => {
        test.todo("is not rendered")
      })

      describe("cancel button", () => {
        describe("clicked", () => {
          test.todo("resets form")
        })
      })

      describe("save button", () => {
        describe("clicked", () => {
          test.todo("saves profile")
        })
      })
    })
  })

  describe("methods", () => {
    describe("#reset_form", () => {
      test.todo("resets form")
    })

    describe("#save_profile", () => {
      test.todo("submits update_user request")

      describe("editing email", () => {
        test.todo("specifies email")
      })

      describe("editing password", () => {
        test.todo("specifies password")
      })

      describe("editing credit_card", () => {
        test.todo("specifies credit_card")
      })

      describe("successful response", () => {
        test.todo("alerts success")

        describe("editing password", () => {
          test.todo("alerts password success")
        })

        describe("editing credit_card", () => {
          test.todo("alerts credit_card success")
        })

        describe("editing email", () => {
          test.todo("alerts email success")
        })

        test.todo("resets form")
      })

      describe("response failure", () => {
        test.todo("alerts error")
      })
    })
  })

  describe("#created", () => {
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    describe("not logged in", () => {
      test.todo("redirects to /txs")
    })
  })
})
