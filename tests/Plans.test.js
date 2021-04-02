import {mount_vue} from './setup'

import Plans from '../src/Plans.vue'
import ziti  from '../src/config/ziti'

describe("Plans Page", () => {
  var plans;

  beforeEach(() => {
    plans = mount_vue(Plans)
  })

  describe("dom", () => {
    describe("#plan_container", () => {
      it("renders .plan for each plan", () => {
        const config_plans = Object.keys(ziti.membership_features);
        const dom_plans = plans.findAll('.plan')
        expect(dom_plans.length).toBe(config_plans.length);

        for(var p = 0; p < dom_plans.length; p += 1){
          expect(dom_plans.at(p).find(".plan_name").text()).toEqual(config_plans[p])
        }
      })

      describe(".plan", () => {
        describe("plan is suggested", () => {
          test.todo("it is .suggested")
        })

        describe("plan is top plan", () => {
          test.todo("it is .top_level")
        })

        describe(".plan_name", () => {
          test.todo("renders plan name")

          describe("plan is current plan", () => {
            test.todo("renders 'Current Plan'")
          })
        })

        describe(".plan_cost", () => {
          describe("plan_cost == 0", () => {
            test.todo("renders 'Free'")
          })

          describe("plan_cost != 0", () => {
            test.todo("renders $cost /month")
          })
        })

        describe(".plan_detail:nth-child(0)", () => {
          test.todo("renders number of plan filters")
        })

        describe(".plan_detail:nth-child(1)", () => {
          test.todo("renders number of plan sinks")
        })

        describe(".plan_detail:nth-child(2)", () => {
          test.todo("renders plan alert time")

          describe("plan alert time includes 0", () => {
            test.todo("renders 'Instant'")
          })
        })
      })

      describe(".buy_additional checkbox", () => {
        test.todo("is tied to enable_additional")

        describe("enable_additional", () => {
          describe("enable_additional is true", () => {
            test.todo("is active")
          })
        })
      })

      describe(".additional_items tr:nth-child(0) spinbutton", () => {
        test.todo("is tied to selected_additional_filters")

        describe("!enable_additional", () => {
          test.todo("is disabled")
        })

        describe("max_filters == 0", () => {
          test.todo("is disabled")
        })
      })

      describe(".additional_items tr:nth-child(1) spinbutton", () => {
        test.todo("is tied to selected_additional_sinks")

        describe("!enable_additional", () => {
          test.todo("is disabled")
        })

        describe("max_sinks == 0", () => {
          test.todo("is disabled")
        })
      })

      describe("upgrade enabled", () => {
        describe(".upgrade", () => {
          test.todo("navigates to /plan with specified params")
        })

        test.todo("does not render login button")
        test.todo("does not render disabled upgrade button")
      })

      describe("!logged_in", () => {
        describe("login button", () => {
          test.todo("is rendered")
        })

        describe("clicked", () => {
          test.todo("launches login modal")
        })

        test.todo("does not render disabled upgrade button")
      })

      describe("upgrade not enabled and logged in", () => {
        describe("disabled upgrade button", () => {
          describe("current plan", () => {
            test.todo("renders 'Current Plan'")
          })
        })

        test.todo("renders subscription end")
      })
    })
  })

  describe("computed", () => {
    describe("top_plan", () => {
      it("is last membership_level", () => {
        expect(plans.vm.top_plan).toEqual(ziti.membership_levels[ziti.membership_levels.length - 1])
      })
    })

    describe("suggested_plan", () => {
      describe("membership_level == top_plan", () => {
        it("is null", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return plans.vm.top_plan;
              }
            }
          })

          expect(plans.vm.suggested_plan).toBeNull();
        })
      })

      it("is next higher membership level", () => {
        const config_plans = Object.keys(ziti.membership_features);

        plans = mount_vue(Plans, {
          computed : {
            membership_level : function(){
              return config_plans[1]
            }
          }
        })

        expect(plans.vm.suggested_plan).toEqual(config_plans[2])
      })
    })

    describe("max_filters", () => {
      test.todo("is max_additions.filters - additional_filters")
    })

    describe("max_sinks", () => {
      test.todo("is max_additions.sinks - additional_sinks")
    })

    describe("total_cost", () => {
      test.todo("is cost for each membership level")
      test.todo("includes base monthly plan cost")

      describe("selected_additional_filters", () => {
        test.todo("includes cost for additional_filters")
      })

      describe("selected_additional_sinks", () => {
        test.todo("includes cost for additional_sinks")
      })

      test.todo("rounds cost to two decimal places")
    })

    describe("upgrade_enabled", () => {
      test.todo("returns upgrade_enabled bool for each membership level")

      describe("not logged_in", () => {
        test.todo("is false")
      })

      describe("current membership level", () => {
        describe("purchasing additional options", () => {
          test.todo("is true")
        })

        test.todo("is false")
      })

      describe("lower membership levels", () => {
        test.todo("is false")
      })

      describe("higher membership levels", () => {
        test.todo("is false")
      })
    })

    describe("expires", () => {
      test.todo("is number of days until current plan renewal date")
    })
  })

  describe("watch", () => {
    describe("enable_additional", () => {
      describe("!enable_additional", () => {
        test.todo("deletes selected_additional_filters")
        test.todo("deletes selected_additional_sinks")
      })
    })
  })

  describe("methods", () => {
    describe("#is_current_plan", () => {
      describe("plan == membership_level", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_current_plan('foobar')).toBe(true);
        })
      })

      describe("plan != membership_level", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_current_plan('barfoo')).toBe(false);
        })
      })
    })

    describe("#is_suggested_plan", () => {
      describe("plan == suggested_plan", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              suggested_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_suggested_plan('foobar')).toBe(true);
        })
      })

      describe("plan != suggested_plan", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              suggested_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_suggested_plan('barfoo')).toBe(false);
        })
      })
    })

    describe("#is_top_plan", () => {
      describe("plan == top_plan", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              top_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_top_plan('foobar')).toBe(true);
        })
      })

      describe("plan != top_plan", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              top_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_top_plan('barfoo')).toBe(false);
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      test.todo("navs to maintenance")
    })
  })
})
