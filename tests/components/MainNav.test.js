describe("MainNav", () => {
  describe("dom", () => {
    describe("logged_in", () => {
      describe("#main_nav", () => {
        test.todo("is .logged_in")
      })

      describe("#membership_level_link_container", () => {
        test.todo("is rendered")
      })

      describe("hamburger", () => {
        describe("#profile_link", () => {
          test.todo("is rendered")
        })

        describe("#logout_link", () => {
          test.todo("is rendered")
        })
      })

      describe("!hamburger", () => {
        describe("#my_account_container", () => {
          test.todo("is rendered")
        })
      })
    })

    describe("!logged_in", () => {
      describe("#login_link", () => {
        test.todo("is rendered")
      })

      describe("#register_link", () => {
        test.todo("is rendered")
      })
    })

    describe("#login_link", () => {
      test.todo("it launches login modal")

      describe("click event", () => {
        test.todo("emits nav event")
      })
    })

    describe("#register_link", () => {
      test.todo("it launches register modal")

      describe("click event", () => {
        test.todo("emits nav event")
      })
    })

    describe("#membership_level_link_container", () => {
      describe("is_premium_member", () => {
        test.todo("is .premium")
      })
    })

    describe("#membership_level_link", () => {
      test.todo("contains membership_level text")
    })

    describe("#logout_link", () => {
      test.todo("emits nav event")
      test.todo("calls logout")
    })

    describe("#my_account_link", () => {
      describe("my_account_visible", () => {
        test.todo("renders arrow-down-gray")
      })

      describe("!my_account_visible", () => {
        test.todo("renders arrow-up-blue")
      })
    })

    describe("#my_account_popover", () => {
      describe("show event", () => {
        test.todo("calls my_account_show")
      })

      describe("hide event", () => {
        test.todo("calls my_account_hide")
      })

      describe("#logout_link", () => {
        describe("click event", () => {
          test.todo("emits close event")
          test.todo("calls logout")
        })
      })
    })
  })

  describe("methods", () => {
    describe("my_account_show", () => {
      test.todo("sets my_account_visisble to true")
    })

    describe("my_account_hide", () => {
      test.todo("sets my_account_visisble to false")
    })
  })
})
