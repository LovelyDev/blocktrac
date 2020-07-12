describe("authentication", () => {
  describe("computed", () => {
    describe("#backend_url", () => {
      test.todo("is config.BACKEND_URL")
    })

    describe("#templates", () => {
      test.todo("sets/gets templates")
    })

    describe("#sinks", () => {
      test.todo("sets/gets sinks")
    })

    describe("#filters", () => {
      test.todo("sets/gets filters")
    })

    describe("#notifications", () => {
      test.todo("sets/gets notifications")
    })

    describe("#active_filter", () => {
      test.todo("sets/gets active_filter")
    })
  })

  describe("methods", () => {
    describe("#set_active_filter", () => {
      describe("filters includes filter", () => {
        test.todo("replaces filter")
      })

      test.todo("adds filter to filters")

      test.todo("redirect to /filter/filter.id")
    })

    describe("#load_templates", () => {
      test.todo("submits templates request")

      describe("success result", () => {
        test.todo("sets templates")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_sinks", () => {
      test.todo("submits sinks request")

      describe("success result", () => {
        test.todo("sets sinks")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filters", () => {
      test.todo("submits filters request")

      describe("success result", () => {
        test.todo("sets filters")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filter", () => {
      test.todo("submits filter request")

      describe("success result", () => {
        test.todo("sets active filter")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filter_matches", () => {
      test.todo("submits filter_matches request")

      describe("success result", () => {
        test.todo("sets converted filter_matches")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_notifications", () => {
      test.todo("submits notifications request")

      describe("success result", () => {
        test.todo("sets notifications")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#update_user", () => {
      test.todo("submits user request")
      test.todo("returns request promise")
    })

    describe("#purchase_plan", () => {
      test.todo("submits purchase request")
      test.todo("returns request promise")
    })

    describe("#cancel_subscription", () => {
      test.todo("submits cancel subscription request")
      test.todo("returns request promise")
    })

    describe("#reset_password", () => {
      test.todo("submits reset password request")
      test.todo("returns request promise")
    })

    describe("#confirm_email", () => {
      test.todo("submits confirm email request")
      test.todo("returns request promise")
    })

    describe("#contact", () => {
      test.todo("submits contact request")
      test.todo("returns request promise")
    })

    describe("#create_sink", () => {
      test.todo("submits create sink request")
      test.todo("returns request promise")
    })

    describe("#delete_sink", () => {
      test.todo("submits delete sink request")
      test.todo("returns request promise")
    })

    describe("#create_filter", () => {
      test.todo("submits create filter request")
      test.todo("returns request promise")
    })

    describe("#delete_filter", () => {
      test.todo("submits delete filter request")
      test.todo("returns request promise")
    })

    describe("#update_filter", () => {
      test.todo("submits update filter request")
      test.todo("returns request promise")
    })

    describe("#delete_filter", () => {
      test.todo("submits delete filter request")
      test.todo("returns request promise")
    })

    describe("#load_notifications", () => {
      test.todo("submits notification request")
      test.todo("returns request promise")
    })
  })
 })
