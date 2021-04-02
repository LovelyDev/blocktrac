import flushPromises from 'flush-promises'

import {mount_vue}  from './setup'
import ConfirmEmail from '../src/ConfirmEmail.vue'

describe("ConfirmEmail page", () => {
  var server_api;

  beforeEach(function(){
    // Stubbed server_api call
    server_api = {
      methods : {
        confirm_email : jest.fn()
      }
    };
  })

  describe("methods", () => {
    describe("#send_request", () => {
      it("sends confirm email request", () => {
        server_api.methods.confirm_email.mockResolvedValue()

        mount_vue(ConfirmEmail, {
          mixins : [server_api],
          propsData : {code : 'code'}
        })

        expect(server_api.methods.confirm_email).toHaveBeenCalledTimes(1)
      })

      describe("confirm email success", () => {
        beforeEach(function(){
          server_api.methods.confirm_email.mockResolvedValue(
              {
                body : {
                  error : 'error'
                }
              }
            )
        })

        it("alerts success", async() => {
          mount_vue(ConfirmEmail, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          await flushPromises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Email successfully confirmed, you may now login")
        })

        it("redirects to /txs", async () => {
          const confirm_email = mount_vue(ConfirmEmail, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          await flushPromises();

          expect(confirm_email.vm.$route.path).toEqual("/txs")
        })
      })

      describe("confirm email failure", () => {
        beforeEach(function(){
          server_api.methods.confirm_email.mockRejectedValue(
              {
                body : {
                  error : 'error'
                }
              }
            )
        })

        it("alerts error", async () => {
          mount_vue(ConfirmEmail, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          await flushPromises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not confirm email: Error")
        })

        it("redirects to /txs", async () => {
          const confirm_email = mount_vue(ConfirmEmail, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          await flushPromises();

          expect(confirm_email.vm.$route.path).toEqual("/txs")
        })
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

        mount_vue(ConfirmEmail, {
          mixins : [server_api, maintenance],
          propsData : {code : 'code'}
        })
        expect(maintenance.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("sends request", () => {
      const send_request = {
        methods : {
          send_request : jest.fn()
        }
      }

      mount_vue(ConfirmEmail, {
        mixins : [server_api, send_request],
        propsData : {code : 'code'}
      })
      expect(send_request.methods.send_request).toHaveBeenCalledTimes(1)
    })
  })
})
