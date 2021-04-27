import {
  mount_vue,
  next_tick
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Plan from '../src/Plan.vue'

import ziti  from '../src/config/ziti'
import { isString } from '../src/vendor/jsonpath'

describe("Plan Page", () => {
  let plan_test
  beforeEach(function() {
    plan_test = mount_vue(Plan, {
      propsData: {
        plan: "standard",
        filters: 1,
        sinks: 1
      }
    })
  })
  describe("dom", () => {
    describe("#plan_name", () => {
      it("renders plan", () => {
        expect(plan_test.find("#plan_name").text()).toBe(plan_test.vm.plan)
      })
      it("monthly cost", () => {
        expect(plan_test.find("#plan_monthly_cost").text()).toBe('$' + plan_test.vm.details.cost + " /month")
      })
    })

    describe("#plan_specifics", () => {
      describe("#filters", () => {
        it("renders plan filters", () => {
          expect(parseInt(plan_test.find("#filters .specifics_value").text())).toBe(plan_test.vm.details.filters)
        })
      })

      describe("#sinks", () => {
        it("renders plan sinks", () => {
          expect(parseInt(plan_test.find("#sinks .specifics_value").text())).toBe(plan_test.vm.details.sinks)
        })
      })

      describe("#alert_time", () => {
        it("renders plan alert time text", () => {
          expect(plan_test.find("#alert_time .specifics_value").text()).toBe(plan_test.vm.alert_time_text);
        })
      })
    })

    describe("#enable_additional checkbox", () => {
      it("is tied to enable_additional", async () => {
        plan_test.setData({enable_additional: false})
        await next_tick(plan_test)
        expect(plan_test.find("#enable_additional input")).toBeChecked()
      })
    })

    describe("#enable_additional_label", () => {
      describe("enable_additional set", () => {
        it("is active", () => {
          expect(plan_test.find("#enable_additional_label").classes()).toContain('active')
        })
      })
    })

    describe("#additional_filters spinbutton", () => {
      it("is tied to selected_additional_filters", () => {
        expect(parseInt(plan_test.find("#additional_filters .b-form-spinbutton").text())).toBe(plan_test.vm.selected_additional_filters)
      })

      describe("!enable_additional", () => {
        it("is disabled", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.find("#additional_filters .b-form-spinbutton").classes()).toContain('disabled')
        })
      })

      describe("max_filters == 0", () => {
        it("is diabled", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "standard",
              filters: 1,
              sinks: 1
            },
            computed: {
              max_filters: function() {
                return 0
              }
            }
          })
          expect(plan_test.find('#additional_filters .b-form-spinbutton').classes()).toContain('disabled')
        })
      })
    })

    describe("#additional_sinks spinbutton", () => {
      it("is tied to selected_additional_sinks", () => {
        expect(parseInt(plan_test.find("#additional_sinks .b-form-spinbutton").text())).toBe(plan_test.vm.selected_additional_sinks)
      })

      describe("!enable_additional", () => {
        it("is disabled", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.find("#additional_sinks .b-form-spinbutton").classes()).toContain('disabled')
        })
      })

      describe("max_sinks == 0", () => {
        it("is disabled", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "standard",
              filters: 1,
              sinks: 1
            },
            computed: {
              max_sinks: function() {
                return 0
              }
            }
          })
          expect(plan_test.find('#additional_sinks .b-form-spinbutton').classes()).toContain('disabled')
        })
      })
    })

    describe("#plan_periods", () => {
      describe("first plan_period", () => {
        describe("period not set", () => {
          it("is selected", () => {
            expect(plan_test.find('.plan_period').classes()).toContain('selected')
          })
        })

        describe("period == 1", () => {
          it("is selected", async () => {
            plan_test.setData({period: 1})
            await next_tick(plan_test)
            expect(plan_test.find('.plan_period').classes()).toContain('selected')
          })
        })

        describe("click", () => {
          it("set_period(1)", async () => {
            plan_test.find('.plan_period').trigger('click')
            await next_tick(plan_test)
            expect(plan_test.vm.period).toBeNull()
          })
        })

        describe(".plan_period_cost", () => {
          it("renders monthly cost", () => {
            expect(plan_test.find('#plan_periods .plan_period_cost').text()).toEqual('$' + plan_test.vm.details.cost)
          })
        })
      })

      describe("monthly plan_periods", () => {
        describe("period == month", () => {
          it("is selected", async () => {
            plan_test.setData({period: 6})
            await next_tick(plan_test)
            expect(plan_test.findAll('.plan_period').at(Math.ceil(plan_test.vm.period / 3)).classes()).toContain('selected')
          })
        })

        describe("click", () => {
          it("set_period(month)", async () => {
            plan_test.findAll('.plan_period').at(1).trigger("click");
            await next_tick(plan_test)
            expect(plan_test.vm.period).toBe(3);
          })
        })

        it("renders month", async () => {
          plan_test.setData({period: 3})
          await next_tick(plan_test)
          expect(plan_test.findAll(".plan_period .plan_month b").at(1).text()).toBe("6 months");

        })

        describe(".plan_period_cost", () => {
          let monthly_costs;
          beforeEach(function(){
            monthly_costs = ziti.membership_features[plan_test.vm.plan].monthly_costs;
          })
          it("renders monthly cost * months crossed out", async () => {
            for(let i=0; i<Object.keys(monthly_costs).length; i++){
              expect(plan_test.findAll(".orig_cost").at(i).text()).toBe("$" + plan_test.vm.details.cost * Object.keys(monthly_costs)[i])
            }
          })
          it("renders reduced cost", () => {
            for(let i=0; i<Object.keys(monthly_costs).length; i++){
              expect(plan_test.findAll(".plan_period_cost b").at(i + 1).text()).toBe("$" + monthly_costs[Object.keys(monthly_costs)[i]])
            }
          })
        })
      })
    })

    describe("#order_details", () => {
      describe(".order_detail:nth-child(1)", () => {
        it("renders total_filters", () => {
          expect(parseInt(plan_test.find("#order_details .order_detail_value").text())).toBe(plan_test.vm.total_filters)
        })
      })

      describe(".order_detail:nth-child(2)", () => {
        it("renders total_sinks", () => {
          expect(parseInt(plan_test.find("#order_details .order_detail:nth-child(2) .order_detail_value").text())).toBe(plan_test.vm.total_sinks)
        })
      })

      describe(".order_detail:nth-child(3)", () => {
        it("renders sinks_per_filter", () => {
          expect(parseInt(plan_test.find("#order_details .order_detail:nth-child(3) .order_detail_value").text())).toBe(plan_test.vm.details.sinks_per_filter)
        })
      })

      describe(".order_detail:nth-child(4)", () => {
        it("renders alert_time_text", () => {
          expect(plan_test.find("#order_details .order_detail:nth-child(4) .order_detail_value").text()).toBe(plan_test.vm.alert_time_text)
        })
      })

      describe(".order_detail:nth-child(5)", () => {
        it("renders instant_alerts", () => {
          expect(plan_test.find("#order_details .order_detail:nth-child(5) .order_detail_value").text()).toBe(plan_test.vm.instant_alerts? "Yes": "No")
        })
      })
    })

    describe("order_overview", () => {
      it("renders total_cost", () => {
        expect(plan_test.find("#order_overview .order_detail_value").text()).toBe("$" + plan_test.vm.total_cost)
      })
    })

    describe("#checkout_button", () => {
      it("navigates to /checkout with specified params", async () => {
        let { period, plan, selected_additional_filters, selected_additional_sinks } = plan_test.vm;
        let testing_params = {
          period,
          plan,
          specified_filters:selected_additional_filters,
          specified_sinks:selected_additional_sinks
        }
        plan_test.find("#checkout_button").trigger("click")
        next_tick(plan_test)
        expect(plan_test.vm.$route.path).toBe("/checkout")
        expect(plan_test.vm.$route.params).toEqual(testing_params)
      })
    })
  })

  describe("computed", () => {
    describe("#details", () => {
      describe("no plan", () => {
        it("is {}", () => {
          const plan_test = mount_vue(Plan)
          expect(plan_test.vm.details).toEqual({})
        })
      })
      it("is membership_features for plan", () => {
        expect(plan_test.vm.details).toEqual(ziti.membership_features[plan_test.vm.plan])
      })
    })

    describe("#max_filters", () => {
      it("is max_additions.filters - additional_filters", () => {
        expect(plan_test.vm.max_filters).toEqual(ziti.max_additions.filters - plan_test.vm.additional_filters)
      })
    })

    describe("#max_sinks", () => {
      it("is max_additions.sinks - additional_sinks", () => {
        expect(plan_test.vm.max_sinks).toEqual(ziti.max_additions.sinks - plan_test.vm.additional_sinks)
      })
    })

    describe("#upgrading_plan", () => {
      describe("plan != membership_level", () => {
        it("is true", () => {
          expect(plan_test.vm.upgrading_plan).toBe(true)
        })
      })

      describe("plan == membership_level", () => {
        it("is false", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "basic"
            },
            computed: {
              membership_level: function(){
                return "basic"
              }
            }
          })
          expect(plan_test.vm.upgrading_plan).toBe(false);
        })
      })
    })

    describe("#instant_alerts", () => {
      describe("notification_times includes 0", () => {
        it("is true", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "premium"
            }
          })
          expect(plan_test.vm.instant_alerts).toBe(true)
        })
      })

      describe("notification_times does not include 0", () => {
        it("is false", () => {
          expect(plan_test.vm.instant_alerts).toBe(false)
        })
      })
    })

    describe("#alert_time_text;", () => {
      describe("instant_alerts", () => {
        it("is 'Instant'", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "premium"
            }
          })
          expect(plan_test.vm.alert_time_text).toBe("Instant")
        })
      })
      it("is minimum plan notification_time + 'min'", () => {
        expect(plan_test.vm.alert_time_text).toBe(plan_test.vm.details.notification_times[0] + " min")
      })
    })

    describe("#total_filters", () => {
      describe("!enable_additional", () => {
        it("is details.filters", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.vm.total_filters).toBe(plan_test.vm.details.filters)
        })
      })

      describe("!selected_additional_filters", () => {
        it("is details.filters", async () => {
          plan_test.setData({selected_additional_filters: false})
          await next_tick(plan_test)
          expect(plan_test.vm.total_filters).toBe(plan_test.vm.details.filters)
        })
      })

      it("is details.filters + selected_additional_filters", async () => {
        plan_test.setData({enable_additional: true})
        await next_tick(plan_test)
        expect(plan_test.vm.total_filters).toBe(plan_test.vm.details.filters + plan_test.vm.selected_additional_filters)
      })
    })

    describe("#total_sinks", () => {
      describe("!enable_additional", () => {
        it("is details.sinks", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.vm.total_sinks).toBe(plan_test.vm.details.sinks)
        })
      })

      describe("!selected_additional_sinks", () => {
        it("is details.sinks", async () => {
          plan_test.setData({selected_additional_sinks: false})
          await next_tick(plan_test)
          expect(plan_test.vm.total_sinks).toBe(plan_test.vm.details.sinks)
        })
      })

      it("is details.sinks + selected_additional_sinks", async () => {
        plan_test.setData({enable_additional: true})
        await next_tick(plan_test)
        expect(plan_test.vm.total_sinks).toBe(plan_test.vm.details.sinks + plan_test.vm.selected_additional_sinks)
      })
    })

    describe("#total_cost", () => {
      describe("upgrading_plan", () => {
        it("includes monthly plan cost", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "standard"
            },
            computed: {
              membership_level: function(){
                return "basic"
              }
            },
            data: function(){
              return {
                enable_additional: false
              }
            }
          })
          expect(plan_test.vm.total_cost).toBe(plan_test.vm.details.cost)
        })
      })

      describe("selected_additional_filters", () => {
        it("includes monthly costs for filters", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "standard"
            },
            computed: {
              membership_level: function(){
                return "standard"
              }
            },
            data: function(){
              return {
                enable_additional: true,
                selected_additional_filters: 2
              }
            }
          })
          expect(plan_test.vm.total_cost).toBe(plan_test.vm.selected_additional_filters * ziti.additions_cost.filters)
        })
      })

      describe("selected_additional_sinks", () => {
        it("includes monthly costs for sinks", () => {
          const plan_test = mount_vue(Plan, {
            propsData: {
              plan: "standard"
            },
            computed: {
              membership_level: function(){
                return "standard"
              }
            },
            data: function(){
              return {
                enable_additional: true,
                selected_additional_sinks: 2
              }
            }
          })
          expect(plan_test.vm.total_cost).toBe(plan_test.vm.selected_additional_sinks * ziti.additions_cost.sinks)
        })
      })

      it("rounds cost to two decimal places", () => {
        expect(plan_test.vm.total_cost).toBeRoundedTo(2)
      })
    })
  })

  describe("watch", () => {
    describe("enable_additional", () => {
      let plan_test
      beforeEach(function(){
        plan_test = mount_vue(Plan, {
          data: function(){
            return {
              enable_additional: true,
              selected_additional_filters: 1,
              selected_additional_sinks: 1
            }
          }
        })
      })
      describe("!enable_additional", () => {
        it("sets selected_additional_filters to null", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.vm.selected_additional_filters).toBeNull()
        })
        it("sets selected_additional_sinks to null", async () => {
          plan_test.setData({enable_additional: false})
          await next_tick(plan_test)
          expect(plan_test.vm.selected_additional_sinks).toBeNull()
        })
      })
    })
  })

  describe("methods", () => {
    describe("#set_period", () => {
      describe("month == 1", () => {
        it("sets period = null", () => {
          plan_test.vm.set_period(1)
          expect(plan_test.vm.period).toBeNull()
        })
      })
      it("sets period = integer month", () => {
        let month = 2
        plan_test.vm.set_period(month)
        expect(plan_test.vm.period).toBe(month)
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Plan, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("plan is not set", () => {
      it("redirects to /plans", () => {
        const plan = mount_vue(Plan)
        expect(plan.vm.$route.path).toEqual("/plans")
      })
    })

    describe("filters set", () => {
      it("sets enable_additional to true", () => {
        const plan = mount_vue(Plan, {
          propsData : {
            plan : ziti.membership_levels[1],
            filters : 2
          }
        })

        expect(plan.vm.enable_additional).toBe(true)
      })

      it("sets selected_additional_filters from filters", () => {
        const plan = mount_vue(Plan, {
          propsData : {
            plan : ziti.membership_levels[1],
            filters : 2
          }
        })

        expect(plan.vm.selected_additional_filters).toBe(2)
      })
    })

    describe("sinks set", () => {
      it("sets enable_additional to true", () => {
        const plan = mount_vue(Plan, {
          propsData : {
            plan : ziti.membership_levels[1],
            sinks : 2
          }
        })

        expect(plan.vm.enable_additional).toBe(true)
      })

      it("sets selected_additional_sinks from sinks", () => {
        const plan = mount_vue(Plan, {
          propsData : {
            plan : ziti.membership_levels[1],
            sinks : 2
          }
        })

        expect(plan.vm.selected_additional_sinks).toBe(2)
      })
    })
  })
})
