import {
  mount_vue,
  shallow_mount_vue,
  flush_promises,
  next_tick
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Checkout from '../src/Checkout.vue'
import { SwitchCase } from '../src/vendor/aesprim';

describe("Checkout Page", () => {

  var server_api;
  var checkout;
  var scheckout;

  beforeEach(function(){
    server_api = {
      methods : {
        purchase_plan: jest.fn(),
        update_user: jest.fn()
      }
    };
    checkout = mount_vue(Checkout, {
      mixins : [server_api],
      propsData : {
        plan : 'standard',
        period: 3,
        specified_filters: 1,
        specified_sinks: 1
      }
    });
    scheckout = shallow_mount_vue(Checkout, {
      mixins : [server_api],
      propsData : {
        plan : 'standard',
        period: 3,
        specified_filters: 1,
        specified_sinks: 1
      }
    });

  })

  describe("dom", () => {
    describe("successful checkout", () => {
      it("successful checkout", async() => {
        const ch = mount_vue(Checkout, {
          mixins : [server_api],
          propsData : {plan : 'standard'}
        })
        ch.setData({success: true});
        await flush_promises();
        expect(ch.find("#success_checkout")).toExist();
      })
    })

    describe("#checkout_subcontainer > #enjoy", () => {
      it("contains period plan", () => {
        const enjoy = checkout.find("#checkout_subcontainer > #enjoy")
        expect(enjoy.text()).toEqual("Enjoy your 3 month standard Plan");
      })
    })

    describe("#checkout_subcontainer > h5", () => {
      it("contains total cost", async() => {
        const total_cost = checkout.find("#checkout_subcontainer > h5")
        expect(total_cost.text()).toMatch("Total Due: $31.99");
      })
    })

    describe("#checkout_subcontainer > #next_payment", () => {
      it("contains next payment", async() => {
        const next_payment = checkout.find('#next_payment');
        expect(next_payment).toExist(); 
      })
    })

    describe("#credit_card_number", () => {
      var credit_card_number;
      beforeEach(function(){
        credit_card_number = checkout.find("#credit_card_number");
      })
      it("is credit card number with dashes", async() => {
        checkout.vm.credit_card_number = '4242424242424242';
        await next_tick(checkout);
        expect(credit_card_number.element.value).toEqual('4242-4242-4242-4242')
      })
    })

    describe("#credit_card_number_wrapper > .form_error", () => {
      var credit_card_number;
      beforeEach(function(){
        credit_card_number = checkout.find("#credit_card_number");
      })
      describe("invalid credit card number", () => {
        it("contains error message", async() => {
          checkout.vm.credit_card_number = '424';
          await next_tick(checkout);
          const error_msg = checkout.find(".form_text > span");
          expect(error_msg.text()).toEqual("Must be 14 to 16 digits");
        })
      })
    })

    describe("#credit_card_month", () => {
      var credit_month;
      beforeEach(function(){
        credit_month = checkout.find("#credit_card_month");
      })

      it("gets/sets credit_card_month", async() => {
        checkout.vm.credit_card_month = "11 Nov";
        await next_tick(checkout);
        expect(credit_month.props().value).toBe("11 Nov");
      })

      it("has credit_card_months options", async() => {
        const options = credit_month.findAll('option');
        expect(options.length).toBe(12);
      })
    })

    describe("#credit_card_year", () => {
      var credit_card_year_element;

      beforeEach(function(){
        credit_card_year_element = checkout.find("#credit_card_year");
      })

      it('gets/sets credit_card_year', async() => {
        const current_year = (new Date()).getFullYear()
        checkout.vm.credit_card_year = current_year + 1;
        await next_tick(checkout);
        expect(credit_card_year_element.props().value).toBe(current_year + 1)
      })

      it("has credit_card_years options", () => {
        const options = credit_card_year_element.findAll('option');
        expect(options.length).toBe(10)
      })
    })

    describe("#tos_agree > checkbox", () => {
      var tos_agree_checkbox_element
      beforeEach(function (){
        tos_agree_checkbox_element = scheckout.find("#tos_agree_checkout");
      })
      it("is tied dto tos_agree", async() => {
        scheckout.vm.tos_agree = true;
        await next_tick(scheckout);
        expect(tos_agree_checkbox_element.props().checked).toEqual(true);
      })
    })

    describe("#place_order_wrapper", () => {
      describe("order_submitted", () => {
        it("containes spinner", async() => {
          scheckout.vm.order_submitted = true;
          await next_tick(scheckout);
          var spinner_element = scheckout.find("#bspinner");
          expect(spinner_element).toExist();
        })
      })
    })

    describe("#place_order", () => {
      let button_element;
      describe("!is_valid", () => {
        // test.todo("is disabled")
        it("!is_valid -> disabled", async() => {
          scheckout.vm.tos_agree = false;
          await next_tick(scheckout);
          button_element = scheckout.find("#place_order");
          expect(button_element.attributes().disabled).toBe("true");
        })
      })

      describe("order_submitted", () => {
        it("order_submitted -> disabled", async() => {
          scheckout.vm.order_submitted = true;
          await next_tick(scheckout);
          button_element = scheckout.find('#place_order');
          expect(button_element.attributes().disabled).toBe("true");
        })
      })

      describe("clicked", () => {
        // test.todo("calls #submit")
        it("calls #submit", async() => {
          const actions = {
            methods: {
              submit: jest.fn()
            }
          }
          var ch = shallow_mount_vue(Checkout, {
            propsData : {
              plan : 'standard',
              period: 3,
              specified_filters: 1,
              specified_sinks: 1
            },
            mixins: [actions, server_api]
          })
          await next_tick(ch);
          ch.find("#place_order").trigger("click");
          // expect(ch.find("#place_order").attributes().disabled).toBe("true");
          expect(actions.methods.submit).toHaveBeenCalledTimes(1);
        })
      })
    })
  })

  describe("computed", () => {
    describe("#details", () => {
      describe("plan is not set", () => {
        it("is {}", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: ''
            }
          })
          expect(ch.vm.details).toEqual({});
        })
      })

      it("is membership_features[plan]", async() => {
        var ch = shallow_mount_vue(Checkout, {
          propsData: {
            plan: "standard"
          }
        })
        expect(ch.vm.details).not.toEqual({});
      })
    })

    describe("#upgrading_plan", () => {
      describe("plan == membership_level", () => {
        it("is false", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'basic'
            },
            mixins: [{
              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            }]
          })
          expect(ch.vm.upgrading_plan).toBe(false);
        })
      })
      
      describe("plan != membership_level", () => {
        it("is true", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'standard'
            },
            mixins: [{
              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            }]
          })
          await next_tick(ch);
          expect(ch.vm.upgrading_plan).toBe(true);
        })
      })

      describe("#total_cost", () => {
        describe("upgrading_plan", () => {
          it("includes monthly plan cost", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.total_cost).toBe(7.99);
          })
        })

        describe("specified_filters", () => {
          it("includes monthly costs for filters", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                specified_filters: 1
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.total_cost).toBe(10.99);
          })
        })

        describe("specified_sinks", () => {
          it("includes monthly costs for sinks", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                specified_sinks: 1
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            expect(ch.vm.total_cost).toBe(8.99);
          })
        })

        it("rounds cost to two decimal places", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'standard',
              specified_filters: 1
            },
            mixins: [{
              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            }]
          })
          let result = ch.vm.total_cost;
          let temp_array = result.toString().split(".");
          expect(temp_array[1].length).toBe(2);
        })
      })

      describe("#next_payment", () => {
        it("is period months from now", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'standard',
              period: 1
            },
            mixins: [{
              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            }]
          })
          await next_tick(ch);
          var renewal = new Date(Date.now());
          renewal.setMonth(renewal.getMonth() + ch.vm.period);
          expect(ch.vm.next_payment).toBe(renewal.toLocaleDateString());
        })
      })

      describe("#credit_card_valid", () => {
        describe("have credit card and use_existing_credit_card", () => {
          it("is true", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },
              mixins: [{
                computed: {
                  has_credit_card: function(){
                    return true
                  }
                }
              }]
            })
            ch.vm.use_existing_credit_card = true;
            await next_tick(ch);
            expect(ch.vm.credit_card_valid).toBe(true);
          })
        })

        describe("have credit card number and valid credit card number and have credit card cvc and valid credit card cvc", () => {
          it("is true", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },
              mixins: [{
                computed: {
                  have_credit_card_number: function(){
                    return true
                  },
                  invalid_credit_card_number: function(){
                    return false
                  },
                  have_credit_card_cvc: function(){
                    return true;
                  },
                  invalid_credit_card_cvc: function(){
                    return false;
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.credit_card_valid).toBe(true);
          })
        })

        it("is false", async() => {
          var ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'standard'
            },
            mixins: [{
              computed: {
                has_credit_card: function(){
                  return false
                }
              }
            }]
          })
          ch.vm.use_existing_credit_card = false;
          await next_tick(ch);
          expect(ch.vm.credit_card_valid).toBe(false);
        })
      })

      describe("#is_valid", () => {
        var ch;
        beforeEach(function(){
          ch = shallow_mount_vue(Checkout, {
            propsData: {
              plan: 'standard'
            },
            mixins: [{
              computed: {
                has_credit_card: function(){
                  return true
                }
              }
            }]
          })
        })
        describe("credit_card_valid and tos_agree", () => {
          it("is true", async() => {
            ch.vm.use_existing_credit_card = true;
            ch.vm.tos_agree = true;
            await next_tick(ch);
            expect(ch.vm.is_valid).toBe(true);
          })
        })
        it("is false", async() => {
          ch.vm.use_existing_credit_card = true;
          ch.vm.tos_agree = false;
          await next_tick(ch);
          expect(ch.vm.is_valid).toBe(false);
        })
      })

      describe("#plan_params", () => {
        describe(".membership_level", () => {
          it("is plan", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.plan_params).not.toEqual({});
          })
        })

        describe(".membership_months", () => {
          it("is period", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            expect(ch.vm.plan_params.membership_months).toEqual(3);
          })  
          it("defaults to 1", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            expect(ch.vm.plan_params.membership_months).toEqual(1);
          });
        })

        describe(".additional_filters", () => {
          it("is specified_filters", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3,
                specified_filters: 2
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.plan_params.additional_filters).toBe(2);
          });
        })

        describe(".additional_sinks", () => {
          it("is specified_sinks", async() => {
            var ch = shallow_mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3,
                specified_sinks: 2
              },
              mixins: [{
                computed: {
                  membership_level: function(){
                    return 'basic'
                  }
                }
              }]
            })
            await next_tick(ch);
            expect(ch.vm.plan_params.additional_sinks).toBe(2);
          })
        })
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      var ch;
      beforeEach(function(){
        ch = shallow_mount_vue(Checkout, {
          propsData: {
            plan: 'standard',
            period: 3,
            specified_sinks: 2
          },
          mixins: [{
            computed: {
              membership_level: function(){
                return 'basic'
              }
            }
          }]
        })
        ch.vm.order_submitted = true;
      })

      describe("!use_existing_credit_card", () => {
        var response, server_api, ch;
        response = {res: 'ponse'}
        beforeEach(function(){
          server_api = {
            methods: {
              update_user: jest.fn().mockResolvedValue(response),
              purchase_plan: jest.fn().mockResolvedValue(response)
            }
          }

          ch = shallow_mount_vue(Checkout, {
            mixins: [server_api]
          })
        })

        it("updates user with credit_card_params", async() => {
          ch.vm.use_existing_credit_card = false;
          await next_tick(ch);
          ch.vm.submit();
          expect(server_api.methods.update_user.mock.calls[0][0]).not.toEqual({});
        })

        it("purchases plan", async() => {
          ch.vm.use_existing_credit_card = true;
          await next_tick(ch);
          ch.vm.submit();
          expect(server_api.methods.purchase_plan.mock.calls[0][0]).not.toEqual({});
        })

        describe("failed user update", () => {
          var err, server_api, ch;
          it("alerts error", async() => {
            err = {body: {error: 'error1'}}
            server_api = {
              methods: {
                update_user: jest.fn().mockRejectedValue(err)
              }
            }
            ch = shallow_mount_vue(Checkout, {
              mixins: [server_api]
            });
            ch.vm.use_existing_credit_card = false;
            await next_tick(ch);
            ch.vm.submit();
            await flush_promises();
            expect(window.alert).toHaveBeenCalledTimes(1);
            expect(window.alert.mock.calls[0][0]).toEqual('Could not process credit card: Error1')
          })
        })
      })

      describe("use_existing_credit_card", () => {
        var response, server_api, ch;
        response = {res: 'ponse'}
        beforeEach(function(){
          server_api = {
            methods: {
              update_user: jest.fn().mockResolvedValue(response),
              purchase_plan: jest.fn().mockResolvedValue(response)
            }
          }

          ch = shallow_mount_vue(Checkout, {
            mixins: [server_api]
          })
        })

        it("purchases plan", async() => {
          ch.vm.use_existing_credit_card = true;
          await next_tick(ch);
          ch.vm.submit();
          expect(server_api.methods.purchase_plan.mock.calls[0][0]).not.toEqual({});
        })
        // test.todo("purchases plan")
      })
    })

    describe("#purchase_plan_", () => {
      var response, server_api, ch;
      beforeEach(function(){
        response = {res: 'ponse'};
        server_api = {
          methods: {
            purchase_plan: jest.fn().mockResolvedValue(response)
          }
        }
        ch = shallow_mount_vue(Checkout, {
          mixins: [server_api]
        })
      })

      it("sends purchase plan request", async() => {
        ch.vm.purchase_plan_();
        expect(server_api.methods.purchase_plan).toHaveBeenCalledTimes(1);
        expect(server_api.methods.purchase_plan.mock.calls[0][0]).not.toEqual({})
      });
      describe("purchase success", () => {
        it("sets success true", async() => {
          ch.vm.purchase_plan_();
          await flush_promises();
          expect(ch.vm.success).toBe(true);
        })
      })

      describe("purchase failure", () => {
        var err, f_ch, f_server_api;
        beforeEach(function(){
          err = {body: {error: 'error1'}};
          f_server_api = {
            methods: {
              purchase_plan: jest.fn().mockRejectedValue(err)
            }
          }
          f_ch = shallow_mount_vue(Checkout, {
            mixins: [f_server_api]
          })
        })
        it("alerts error", async() => {
          f_ch.vm.purchase_plan_();
          await flush_promises();
          expect(window.alert).toHaveBeenCalledTimes(1);
          expect(window.alert.mock.calls[0][0]).toEqual('Problem processing payment: Error1')
        })
        it("sets order_submitted to false", async() => {
          f_ch.vm.purchase_plan_();
          await flush_promises();
          expect(f_ch.vm.order_submitted).toBe(false);
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Checkout, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("plan is not set", () => {
      it("redirects to plan page", async() => {
        var ch = mount_vue(Checkout, {
          mixins : [server_api],
          propsData : {
            plan : ''
          }
        });
        expect(ch.vm.$route.path).toEqual("/plans")
      })
    })

    it("sets use_esting_credit_card from has_credit_card", async() => {
      var ch = mount_vue(Checkout, {
        mixins: [{
          computed: {
            has_credit_card: function(){
              return false
            }
          }
        }]
      });
      expect(ch.vm.use_existing_credit_card).toEqual(ch.vm.has_credit_card);
    })
  })
})
