describe("Plan Page", () => {
  describe("dom", () => {
    describe("#plan_name", () => {
      test.todo("renders plan")
      test.todo("monthly cost")
    })

    describe("#plan_specifics", () => {
      describe("#filters", () => {
        test.todo("renders plan filters")
      })

      describe("#sinks", () => {
        test.todo("renders plan sinks")
      })

      describe("#alert_time", () => {
        test.todo("renders plan alert time text")
      })
    })

    describe("#enable_additional checkbox", () => {
      test.todo("is tied to enable_additional")
    })

    describe("#enable_additional_label", () => {
      describe("enable_additional set", () => {
        test.todo("is active")
      })
    })

    describe("#additional_filters spinbutton", () => {
      test.todo("is tied to selected_additional_filters")

      describe("!enable_additional", () => {
        test.todo("is disabled")
      })

      describe("max_filters == 0", () => {
        test.todo("is disabled")
      })
    })

    describe("#additional_sinks spinbutton", () => {
      test.todo("is tied to selected_additional_sinks")

      describe("!enable_additional", () => {
        test.todo("is disabled")
      })

      describe("max_sinks == 0", () => {
        test.todo("is disabled")
      })
    })

    describe("#plan_periods", () => {
      describe("first plan_period", () => {
        describe("period not set", () => {
          test.todo("is selected")
        })

        describe("period == 1", () => {
          test.todo("is selected")
        })

        describe("click", () => {
          test.todo("set_period(1)")
        })

        describe(".plan_period_cost", () => {
          test.todo("renders monthly cost")
        })
      })

      describe("monthly plan_periods", () => {
        describe("period == month", () => {
          test.todo("is selected")
        })

        describe("click", () => {
          test.todo("set_period(month)")
        })

        test.todo("renders month")

        describe(".plan_period_cost", () => {
          test.todo("renders monthly cost * months crossed out")
          test.todo("renders reduced cost")
        })
      })
    })

    describe("#order_details", () => {
      describe(".order_detail:nth-child(0)", () => {
        test.todo("renders total_filters")
      })

      describe(".order_detail:nth-child(1)", () => {
        test.todo("renders total_sinks")
      })

      describe(".order_detail:nth-child(2)", () => {
        test.todo("renders sinks_per_filter")
      })

      describe(".order_detail:nth-child(3)", () => {
        test.todo("renders alert_time_text")
      })

      describe(".order_detail:nth-child(4)", () => {
        test.todo("renders instant_alerts")
      })
    })

    describe("order_overview", () => {
      test.todo("renders total_cost")
    })

    describe("#checkout_button", () => {
      test.todo("navigates to /checkout with specified params")
    })
  })

  describe("computed", () => {
    describe("#details", () => {
      describe("no plan", () => {
        test.todo("is {}")
      })

      test.todo("is membership_features for plan")
    })

    describe("#max_filters", () => {
      test.todo("is max_addtions.filters - additional_filters")
    })

    describe("#max_sinks", () => {
      test.todo("is max_addtions.sinks - additional_sinks")
    })

    describe("#upgrading_plan", () => {
      describe("plan != membership_level", () => {
        test.todo("is true")
      })

      describe("plan == membership_level", () => {
        test.todo("is false")
      })
    })

    describe("#instant_alerts", () => {
      describe("notification_times includes 0", () => {
        test.todo("is true")
      })

      describe("notification_times does not include 0", () => {
        test.todo("is false")
      })
    })

    describe("#alert_time_text", () => {
      describe("instant_alerts", () => {
        test.todo("is 'Instant'")
      })

      test.todo("is minimum plan notification_time + ' min'")
    })

    describe("#total_filters", () => {
      describe("!enable_additional", () => {
        test.todo("is details.filters")
      })

      describe("!selected_additional_filters", () => {
        test.todo("is details.filters")
      })

      test.todo("is details.filters + selected_additional_filters")
    })

    describe("#total_sinks", () => {
      describe("!enable_additional", () => {
        test.todo("is details.sinks")
      })

      describe("!selected_additional_sinks", () => {
        test.todo("is details.sinks")
      })

      test.todo("is details.sinks + selected_additional_sinks")
    })

    describe("#total_cost", () => {
      describe("upgrading_plan", () => {
        test.todo("includes monthly plan cost")
      })

      describe("selected_additional_filters", () => {
        test.todo("includes monthly costs for filters")
      })

      describe("selected_additional_sinks", () => {
        test.todo("includes monthly costs for sinks")
      })

      test.todo("rounds cost to two decimal places")
    })
  })

  describe("watch", () => {
    describe("enable_additional", () => {
      describe("!enable_additional", () => {
        test.todo("sets selected_additional_filters to null")
        test.todo("sets selected_additional_sinks to null")
      })
    })
  })

  describe("methods", () => {
    describe("#set_period", () => {
      describe("month == 1", () => {
        test.todo("sets period = null")
      })

      test.todo("sets period = integer month")
    })
  })

  describe("#created", () => {
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    describe("plan is not set", () => {
      test.todo("redirects to /plans")
    })

    describe("filters set", () => {
      test.todo("sets enable_additional to true")
      test.todo("sets selected_additional_filters from filters")
    })

    describe("sinks set", () => {
      test.todo("sets enable_additional to true")
      test.todo("sets selected_additional_sinks from sinks")
    })
  })
})
