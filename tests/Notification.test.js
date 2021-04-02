import flushPromises from 'flush-promises'

import {mount_vue}    from './setup'
import {load_fixture} from './stubs'

import Notification from '../src/Notification.vue'


describe("Notification Page", () => {
  var data, server_api;

  beforeEach(function(){
    // Mocked notification
    data = load_fixture('notifications')[0]

    // Stubbed server_api call
    server_api = {
      methods : {
        load_notification : jest.fn().mockResolvedValue(
          {
            body : data
          }
        )
      }
    };
  })

  describe("dom", () => {
    it("renders notification filter matches", async () => {
      const notification = mount_vue(Notification, { mixins : [server_api] })
      await flushPromises()

      const matches = notification.findAll(".tx_summary_container")
      expect(matches.length).toEqual(data.FilterMatches.length)
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

        const notification = mount_vue(Notification, {
          mixins : [server_api, maintenance]
        })

        expect(maintenance.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads notification", async() => {
      const notification = mount_vue(Notification, { mixins : [server_api] })
      await flushPromises()
      expect(server_api.methods.load_notification).toHaveBeenCalledTimes(1)
    })

    describe("notification response", () => {
      it("transforms and sets filter matches", async () => {
        // Preserve original via deep copy
        const orig = JSON.parse(JSON.stringify(data))

        const notification = mount_vue(Notification, { mixins : [server_api] })
        await flushPromises()

        expect(notification.vm.notification.FilterMatches.length).toEqual(orig.FilterMatches.length)
        for(var fm = 0; fm < orig.FilterMatches.length; fm += 1){
          const match  = notification.vm.notification.FilterMatches[fm];
          const omatch = orig.FilterMatches[fm].Transaction.raw;
                omatch.transaction.date = orig.FilterMatches[fm].Transaction.date;
          expect(match).toEqual(omatch)
        }
      })
    })
  })
})
