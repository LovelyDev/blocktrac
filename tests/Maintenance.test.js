import {mount_vue} from './setup'
import Maintenance from '../src/Maintenance.vue'

describe("Maintenance Page", () => {
  describe("computed", () => {
    describe("img", () => {
      describe("no xrp configured", () => {
        it("is /asses/maintenance/blockchain.svg", () => {
          const maintenance_test = mount_vue(Maintenance,{
            computed: {
              no_blockchain_configured: function() {
                return true;
              }
            }
          });
          expect(maintenance_test.vm.img).toEqual(require('./assets/maintenance/blockchain.svg'))
        })
      })

      describe("blockchain configured", () => {
        it("is /assets/maintenance/configured_blockchain_upper.svg", () => {
          const maintenance_test = mount_vue(Maintenance,{
            computed: {
              no_blockchain_configured: function() {
                return false;
              },
              configured_blockchain_upper: function(){
                return "xrp";
              }
            }
          });
          expect(maintenance_test.vm.img).toEqual(require('./assets/maintenance/xrp.svg'))
        })
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
