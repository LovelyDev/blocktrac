describe("Profile", () => {
  describe("dom", () => {
    describe("row[1]", () => {
      describe("!editing_email", () => {
        test.todo("renders email")
      })

      describe("editing_email", () => {
        describe("input", () => {
          test.todo("tied to auth_email")
        })
      })

      describe("invalid_email", () => {
        describe("form_error", () => {
          test.todo("renders 'Invalid Email'")
        })
      })

      describe("mq > md", () => {
        describe("!editing email", () => {
          test.todo("render 'Update' email")

          describe("clicked", () => {
            test.todo("editing_email = true")
          })
        })

        describe("editing email", () => {
          test.todo("render 'Cancel' email update")

          describe("clicked", () => {
            test.todo("editing_email = false")
          })
        })
      })

      describe("mq <= md", () => {
        test.todo("render pencil blue")

        describe("clicked", () => {
          test.todo("editing_email = !editing_email")
        })
      })
    })

    describe("row[2]", () => {
      describe("!editing_password", () => {
        test.todo("renders ******")
      })

      describe("editing_password", () => {
        describe("input", () => {
          test.todo("tied to auth_password")
        })
      })

      describe("weak_password", () => {
        describe("form_error", () => {
          test.todo("renders 'Weak password'")
        })
      })

      describe("mq > md", () => {
        describe("!editing email", () => {
          test.todo("render 'Change' Password")

          describe("clicked", () => {
            test.todo("editing_password = true")
          })
        })

        describe("editing password", () => {
          test.todo("render 'Cancel' password update")

          describe("clicked", () => {
            test.todo("editing_password = false")
          })
        })
      })

      describe("mq <= md", () => {
        test.todo("render pencil blue")

        describe("clicked", () => {
          test.todo("editing_password = !editing_password")
        })
      })
    })

    describe("row[3]", () => {
      describe("editing_password", () => {
        describe("input", () => {
          test.todo("tied to auth_password_confirm")
        })
      })

      describe("password_mismatch", () => {
        describe("form_error", () => {
          test.todo("renders 'Passwords do not match'")
        })
      })
    })

    describe("row[5]", () => {
      test.todo("renders membership_level")

      describe("mq > md", () => {
        describe("!is_premium_member", () => {
          test.todo("renders 'Change plan' link")
        })

        describe("!is_basic_member", () => {
          test.todo("renders 'Cancel subscription' link")
        })
      })

      describe("mq <= md", () => {
        describe("!is_premium_member", () => {
          test.todo("renders blue pencil change plan link")
        })

        describe("!is_basic_member", () => {
          test.todo("renders red x cancel subscription link")
        })
      })
    })

    describe("row[7]", () => {
      describe("!editing_credit_card", () => {
        test.todo("renders ******")
      })

      describe("editing_credit_card", () => {
        describe("#credit_card_number", () => {
          test.todo("tied to credit_card_number")
        })
      })

      describe("invalid_credit_card_number", () => {
        describe("form_error", () => {
          test.todo("renders credit card number error")
        })
      })

      describe("mq > md", () => {
        describe("!editing email", () => {
          test.todo("render 'Update ")

          describe("clicked", () => {
            test.todo("editing_credit_card = true")
          })
        })

        describe("editing password", () => {
          test.todo("render 'Cancel'")

          describe("clicked", () => {
            test.todo("editing_credit_card = false")
          })
        })
      })

      describe("mq <= md", () => {
        test.todo("render pencil blue")

        describe("clicked", () => {
          test.todo("editing_credit_card = !editing_credit_card")
        })
      })
    })

    describe("row[8]", () => {
      describe("editing_credit_card", () => {
        describe("#credit_card_cvc", () => {
          test.todo("tied to credit_card_cvc")
        })
      })

      describe("invalid_credit_card_cvc", () => {
        describe("form_error", () => {
          test.todo("renders credit card cvc error")
        })
      })
    })

    describe("row[9]", () => {
      describe("editing_credit_card", () => {
        describe("#credit_card_month", () => {
          test.todo("tied to #credit_card_month")
        })

        describe("#credit_card_year", () => {
          test.todo("tied to #credit_card_year")
        })
      })
    })
  })

  describe("computed", () => {
    describe("#editing_fields", () => {
      describe("editing_email", () => {
        test.todo("is true")
      })

      describe("editing_password", () => {
        test.todo("is true")
      })

      describe("editing_credit_card", () => {
        test.todo("is true")
      })

      describe("!editing_email && !editing_password && !editing_credit_card", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid_email", () => {
      describe("!editing_email", () => {
        test.todo("is true")
      })

      describe("have_email && !invalid_email", () => {
        test.todo("is true")
      })

      describe("editing_email && !have_email || invalid_email", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid_password", () => {
      describe("!editing_password", () => {
        test.todo("is true")
      })

      describe("have_passwords && !invalid_passwords", () => {
        test.todo("is true")
      })

      describe("editing_password && !have_passwords || invalid_passwords", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid_credit_card", () => {
      describe("!editing_credit_card", () => {
        test.todo("is true")
      })

      describe("have_credit_card_number && !invalid_credit_card_number && have_credit_card_cvc && !invalid_credit_card_cvc", () => {
        test.todo("is true")
      })

      describe("editing_credit_card && !have_credit_card_number || invalid_credit_card_number || !have_credit_card_cvc || invalid_credit_card_cvc", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid", () => {
      describe("!valid_email", () => {
        test.todo("is false")
      })

      describe("!valid_password", () => {
        test.todo("is false")
      })

      describe("!valid_credit_card", () => {
        test.todo("is false")
      })

      describe("valid_email && valid_password && valid_credit_card", () => {
        test.todo("is true")
      })
    })
  })

  describe("watch", () => {
    describe("editing_email", () => {
      test.todo("sets auth_email to ''")
    })

    describe("editing_password", () => {
      test.todo("sets auth_password to ''")
      test.todo("sets auth_password_confirm to ''")
    })

    describe("editing_credit_card", () => {
      test.todo("sets credit_card_number to ''")
      test.todo("sets credit_card_cvc to ''")
    })

    describe("editing_fields", () => {
      describe("editing_fields", () => {
        test.todo("emits 'editing'")
      })

      describe("not editing_fields", () => {
        test.todo("emits 'not_editing'")
      })
    })
  })

  describe("methods", () => {
    describe("#reset", () => {
      test.todo("sets editing_email to false")
      test.todo("sets editing_password to false")
      test.todo("sets editing_credit_card to false")
    })
  })

  describe("#created", () => {
    test.todo("sets auth_email to ''")
  })
})
