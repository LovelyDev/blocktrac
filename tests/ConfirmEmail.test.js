import setup from './setup'
import ConfirmEmail from '../src/ConfirmEmail.vue'

describe("ConfirmEmail page", () => {
  describe("methods", () => {
    describe("#send_request", () => {
      test.todo("sends confirm email request")

      describe("confirm email success", () => {
        test.todo("alerts success")
        test.todo("redirects to /txs")
      })

      describe("confirm email failure", () => {
        test.todo("alerts error")
        test.todo("redirects to /txs")
      })
    })
  })

  describe("#created", () => {
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    test.todo("sends request")
  })
})
