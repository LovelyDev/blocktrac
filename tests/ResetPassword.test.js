import {mount_vue} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import ResetPassword from '../src/ResetPassword.vue'

describe("ResetPassword Page", () => {
  describe("dom", () => {
    describe("reset password form", () => {
      describe("validated event", () => {
        test.todo("validates")
      })

      describe("submit event", () => {
        test.todo("submits")
      })
    })

    describe("reset button", () => {
      describe("clicked", () => {
        test.todo("submits")
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      describe("not valid", () => {
        test.todo("does nothing, just returns")
      })

      test.todo("submits reset_password request")

      describe("successful response", () => {
        test.todo("alerts success")
        test.todo("redirects to /txs")
      })

      describe("failed response", () => {
        test.todo("alerts err")
        test.todo("redirects to /txs")
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(ResetPassword, {
          mixins : [_maintenance_mode],
          propsData : {code : 'code'}
        })
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })
  })
})
