import {mount_vue} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Profile from '../src/Profile.vue'

describe("Profile Page", () => {
  describe("dom", () => {
    describe("profile form", () => {
      describe("editing", () => {
        test.todo("enable_controls = true")
      })

      describe("not editing", () => {
        test.todo("enable_controls = false")
      })

      describe("validated event", () => {
        test.todo("validates")
      })
    })

    describe("controls wrapper", () => {
      describe("controls are enabled", () => {
        test.todo("is rendered")
      })

      describe("controls are not enabled", () => {
        test.todo("is not rendered")
      })

      describe("cancel button", () => {
        describe("clicked", () => {
          test.todo("resets form")
        })
      })

      describe("save button", () => {
        describe("clicked", () => {
          test.todo("saves profile")
        })
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
