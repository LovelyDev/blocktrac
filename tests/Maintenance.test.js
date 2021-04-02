import {mount_vue} from './setup'
import Maintenance from '../src/Maintenance.vue'

describe("Maintenance Page", () => {
  describe("computed", () => {
    describe("img", () => {
      describe("no blockchain configured", () => {
        test.todo("is /assets/maintenance/blockchain.svg")
      })

      describe("blockchain configured", () => {
        test.todo("is /assets/maintenance/configured_blockchain_upper.svg")
      })
    })
  })

  describe("#created", () => {
    describe("not maintenance_mode", () => {
      it("redirects to /txs", () => {
        const maintenance = mount_vue(Maintenance, {
          mixins : [{
            computed : {
              maintenance_mode : function(){
                return false;
              }
            }
          }]
        })

        expect(maintenance.vm.$route.path).toEqual("/txs")
      })
    })
  })
})
