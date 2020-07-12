describe("authentication", () => {
  describe("computed", () => {
    describe("#backend_url", () => {
      test.todo("is config.BACKEND_URL")
    })

    describe("#auth_token", () => {
      test.todo("is authToken cookie")
    })

    describe("#auth_header", () => {
      test.todo("constructs authorization header from auth_token")
    })

    describe("#logged_in", () => {
      describe("have auth token", () => {
        test.todo("is true")
      })

      describe("do not have auth token", () => {
        test.todo("is false")
      })
    })

    describe("#email", () => {
      test.todo("is store.user.email")
    })

    describe("#profile", () => {
      test.todo("is store.user.profile")
    })

    describe("#renewal_date", () => {
      test.todo("is store.user.renewal_date")
    })

    describe("#has_credit_card", () => {
      test.todo("is store.user.has_credit_card")
    })

    describe("#privileges", () => {
      test.todo("is store.user.privileges")
    })

    describe("#membership_level", () => {
      test.todo("is store.user.membership_level")
    })

    describe("#is_basic_member", () => {
      describe("membership_level == 'basic'", () => {
        test.todo("is true")
      })

      describe("membership_level != 'basic'", () => {
        test.todo("is false")
      })
    })

    describe("#is_premium_member", () => {
      describe("membership_level == 'premium'", () => {
        test.todo("is true")
      })

      describe("membership_level != 'premium'", () => {
        test.todo("is false")
      })
    })

    describe("#membership_features", () => {
      test.todo("is membership_level's features")
    })

    describe("#additional_filters", () => {
      test.todo("is store.user.additional_filters")
    })

    describe("#authroized_filters", () => {
      test.todo("is membership_features.filters + additional_filters + additional_filters privilege")
    })

    describe("#additional_sinks", () => {
      test.todo("is store.user.additional_sinks")
    })

    describe("#authroized_sinks", () => {
      test.todo("is membership_features.sinks + additional_sinks + additional_sinks privilege")
    })

    describe("#advanced_sinks", () => {
      describe("no membership_level", () => {
        test.todo("is false")
      })

      describe("membership_level.advanced_sinks", () => {
        test.todo("is true")
      })

      describe("advanced_sinks privilege", () => {
        test.todo("is true")
      })
    })

    describe("#have_email", () => {
      describe("auth_email", () => {
        test.todo("is true")
      })

      describe("!auth_email", () => {
        test.todo("is false")
      })
    })

    describe("#invalid_email", () => {
      describe("do not have email", () => {
        test.todo("is false")
      })

      describe("email is valid", () => {
        test.todo("is false")
      })

      describe("have email and email invalid", () => {
        test.todo("is true")
      })
    })

    describe("#have_password", () => {
      describe("auth_password", () => {
        test.todo("is true")
      })

      describe("!auth_password", () => {
        test.todo("is false")
      })
    })

    describe("#have_passwords", () => {
      describe("!auth_password", () => {
        test.todo("is false")
      })

      describe("!auth_password_confirm", () => {
        test.todo("is false")
      })

      describe("auth_password and auth_password_confirm", () => {
        test.todo("is true")
      })
    })

    describe("#password_strength", () => {
      test.todo("returns password strength")
    })

    describe("#weak_password", () => {
      describe("!have_password", () => {
        test.todo("is false")
      })

      describe("password strength score < minimum", () => {
        test.todo("is true")
      })

      describe("password strength score >= minimum", () => {
        test.todo("is false")
      })
    })

    describe("password_mismatch", () => {
      describe("!have_passowrds", () => {
        test.todo("is false")
      })

      describe("auth_password == auth_password_confirm", () => {
        test.todo("is false")
      })

      describe("auth_password != auth_password_confirm", () => {
        test.todo("is true")
      })
    })

    describe("#invalid_passwords", () => {
      describe("!have_passwords", () => {
        test.todo("is false")
      })

      describe("weak_password", () => {
        test.todo("is true")
      })

      describe("password_mismatch", () => {
        test.todo("is true")
      })
    })
  })

  describe("methods", () => {
    describe("#privilege", () => {
      test.todo("returns privilege")

      test.todo("converts privilege to integer")

      test.todo("converts privilege to boolean")

      describe("privilege not found", () => {
        test.todo("returns null")

        test.todo("returns integer 0")

        test.todo("returns boolean false")
      })
    })

    describe("#not_authenticated", () => {
      describe("status == 401", () => {
        test.todo("returns true")
      })

      describe("status != 401", () => {
        test.todo("returns false")
      })
    })

    describe("#register", () => {
      test.todo("submits register request")

      describe("in progress filter set", () => {
        test.todo("sets filter on request")
      })

      describe("success result", () => {
        test.todo("clears in progress filter")
        test.todo("alerts success result")
      })

      describe("failed result", () => {
        test.todo("alerts failed result")
      })
    })

    describe("#login", () => {
      test.todo("submits login request")

      describe("in progress filter set", () => {
        test.todo("sets filter on request")
      })

      describe("success result", () => {
        test.todo("clears in progress filter")
        test.todo("sets authToken cookie")
        test.todo("loads user")
      })

      describe("failed result", () => {
        test.todo("alerts failed result")
      })
    })

    describe("#load_user", () => {
      test.todo("submits user request")

      describe("success result", () => {
        test.todo("sets user")
      })

      describe("failed result", () => {
        test.todo("alerts session timeout")
        test.todo("removes authToken cookie")
        test.todo("clears user")
        test.todo("redirects to /txs")
      })
    })

    describe("#logout", () => {
      test.todo("submits logout request")

      describe("success result", () => {
        test.todo("removes authToken cookie")
        test.todo("clears user")
        test.todo("redirects to /txs")
      })

      describe("failed result", () => {
        test.todo("removes authToken cookie")
        test.todo("clears user")
        test.todo("redirects to /txs")
      })
    })

    describe("#reset_password", () => {
      test.todo("submits reset password requset")

      describe("success result", () => {
        test.todo("alerts password reset instructions")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })
  })
})
