import {
  mount_vue,
  next_tick
} from './setup'

import {stubbed_validatable} from './stubs'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Profile from '../src/Profile.vue'

describe("Profile Page", () => {
  var profile

  beforeEach(function(){
    profile = mount_vue(Profile)
  })

  describe("dom", () => {
    describe("profile form", () => {
      describe("editing", () => {
        it("sets enable_controls = true", () => {
          profile.find("#profile_form").vm.$emit('editing')
          expect(profile.vm.enable_controls).toBe(true)
        })
      })

      describe("not editing", () => {
        it("enable_controls = false", () => {
          profile.find("#profile_form").vm.$emit('editing')
          profile.find("#profile_form").vm.$emit('not_editing')
          expect(profile.vm.enable_controls).toBe(false)
        })
      })

      describe("validated event", () => {
        it("validates", () => {
          const validatable = stubbed_validatable()
          profile = mount_vue(Profile, {
            mixins : [validatable]
          })

          const evnt = {ev : 'nt'}
          profile.find("#profile_form").vm.$emit('validated')
          expect(profile.vm.enable_controls).toBe(false)
          expect(validatable.methods.validate).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("controls wrapper", () => {
      describe("controls are enabled", () => {
        it("is rendered", async () => {
          profile.setData({enable_controls : true})
          await next_tick(profile);
          expect(profile.find("#controls_wrapper")).toBeVisible()
        })
      })

      describe("controls are not enabled", () => {
        it("is not rendered", async () => {
          profile.setData({enable_controls : false})
          await next_tick(profile);
          expect(profile.find("#controls_wrapper")).not.toBeVisible()
        })
      })

      describe("#profile_cancel", () => {

        describe("clicked", () => {
          it("resets form", async () => {
            const actions = {
              methods : {
                  reset_form : jest.fn()
              }
            }
            profile = mount_vue(Profile, {
              mixins : [actions]
            })

            profile.setData({enable_controls : true})
            await next_tick(profile);
            profile.find("#profile_cancel").trigger("click")
            expect(actions.methods.reset_form).toHaveBeenCalledTimes(1)
          })
        })
      })

      describe("#profile_save", () => {
        describe("clicked", () => {
          it("saves profile", async () => {
            const actions = {
              methods : {
                  reset_form : jest.fn()
              }
            }
            profile = mount_vue(Profile, {
              mixins : [actions]
            })

            profile.find("#profile_cancel").trigger("click")
            expect(actions.methods.reset_form).toHaveBeenCalledTimes(1)
          })
        })
      })
    })

    describe("CancelSubscriptionModal", () => {
      describe("cancelled", () => {
        test.todo("calls load_user")
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
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Profile, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("not logged in", () => {
      it("redirects to /txs", () => {
        const profile = mount_vue(Profile, {
          mixins : [{
            computed : {
              logged_in : function(){
                return false;
              }
            }
          }]
        })

        expect(profile.vm.$route.path).toEqual("/txs")
      })
    })
  })
})
