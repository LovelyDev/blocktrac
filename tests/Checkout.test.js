import {mount_vue} from './setup'
import Checkout from '../src/Checkout.vue'

describe("Checkout Page", () => {
  describe("dom", () => {
    describe("successful checkout", () => {
      test.todo("renders success content")
    })

    describe("#checkout_subcontainer > #enjoy", () => {
      test.todo("contains period plan")
    })

    describe("#checkout_subcontainer > h5", () => {
      test.todo("contains total cost")
    })

    describe("#checkout_subcontainer > #next_payment", () => {
      test.todo("contains next payment")
    })

    describe("#credit_card_number", () => {
      test.todo("is credit card number with dashes")

      describe("input", () => {
        test.todo("sets credits card number")
      })
    })

    describe("#credit_card_number_wrapper > .form_error", () => {
      describe("invalid credit card number", () => {
        test.todo("contains error message")
      })
    })

    describe("#credit_card_month", () => {
      test.todo("gets/sets credit_card_month")
      test.todo("has credit_card_months options")
    })

    describe("#credit_card_year", () => {
      test.todo("gets/sets credit_card_year")
      test.todo("has credit_card_years options")
    })

    describe("#tos_agree > checkbox", () => {
      test.todo("is tied to tos_agree")
    })

    describe("#place_order_wrapper", () => {
      describe("order_submitted", () => {
        test.todo("contains spinner")
      })
    })

    describe("#place_order", () => {
      describe("!is_valid", () => {
        test.todo("is disabled")
      })

      describe("order_submitted", () => {
        test.todo("is disabled")
      })

      describe("clicked", () => {
        test.todo("calls #submit")
      })
    })
  })

  describe("computed", () => {
    describe("#details", () => {
      describe("plan is not set", () => {
        test.todo("is {}")
      })

      test.todo("is membership_features[plan]")
    })

    describe("#upgrading_plan", () => {
      describe("plan == membership_level", () => {
        test.todo("is false")
      })

      describe("plan != membership_level", () => {
        test.todo("is true")
      })

      describe("#total_cost", () => {
        describe("upgrading_plan", () => {
          test.todo("includes monthly plan cost")
        })

        describe("specified_filters", () => {
          test.todo("includes monthly costs for filters")
        })

        describe("specified_sinks", () => {
          test.todo("includes monthly costs for sinks")
        })

        test.todo("rounds cost to two decimal places")
      })

      describe("#next_payment", () => {
        test.todo("is period months from now")
      })

      describe("#credit_card_valid", () => {
        describe("have credit card and use_existing_credit_card", () => {
          test.todo("is true")
        })

        describe("have credit card number and valid credit card number and have credit card cvc and valid credit card cvc", () => {
          test.todo("is true")
        })

        test.todo("is false")
      })

      describe("#is_valid", () => {
        describe("credit_card_valid and tos_agree", () => {
          test.todo("is true")
        })

        test.todo("is false")
      })

      describe("#plan_params", () => {
        describe(".membership_level", () => {
          test.todo("is plan")
        })

        describe(".membership_months", () => {
          test.todo("is period")
          test.todo("defaults to 1")
        })

        describe(".additional_filters", () => {
          test.todo("is specified_filters")
        })

        describe(".additional_sinks", () => {
          test.todo("is specified_sinks")
        })
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      test.todo("sets order_submitted")

      describe("!use_existing_credit_card", () => {
        test.todo("updates user with credit_card_params")
        test.todo("purchases plan")

        describe("failed user update", () => {
          test.todo("alerts error")
          test.todo("sets order_submitted to false")
        })
      })

      describe("use_existing_credit_card", () => {
        test.todo("purchases plan")
      })
    })

    describe("#purchase_plan_", () => {
      test.todo("sends purchase plan request")

      describe("purchase success", () => {
        test.todo("sets success true")
      })

      describe("purchase failure", () => {
        test.todo("alerts error")
        test.todo("sets order_submitted to false")
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        var maintenance = {
          computed : {
            maintenance_mode : function(){
              return true;
            }
          },

          methods : {
            nav_to_maintenance : jest.fn()
          }
        }

        mount_vue(Checkout, {mixins : [maintenance]})
        expect(maintenance.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("plan is not set", () => {
      test.todo("redirects to plans page")
    })

    test.todo("sets use_existing_credit_card from has_credit_card")
  })
})
