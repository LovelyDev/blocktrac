import {
  mount_vue
} from './setup';

import Landing from '../src/Landing.vue'
describe("Landing Page", () => {
  let con_landing_test, nocon_landing_test;
  beforeEach(function(){
    nocon_landing_test = mount_vue(Landing, {
      computed: {
        no_blockchain_configured: function(){
          return true;
        }
      }
    })
    con_landing_test = mount_vue(Landing, {
      computed: {
        no_blockchain_configured: function(){
          return false;
        },
        configured_blockchain_upper: function(){
          return "xrp";
        }
      }
    })
  })
  describe("computed", () => {
    describe("#blockchain_text", () => {
      describe("no blockchain configured", () => {
        it("is 'Blockchain'", () => {
          expect(nocon_landing_test.vm.blockchain_text).toBe("Blockchain");
        })
      })

      describe("blockchain configured", () => {
        it("is configured_blockchain_upper", () => {
          expect(con_landing_test.vm.blockchain_text).toBe("xrp")
        })
      })
    })
  })

  describe("methods", () => {
    describe("#img_src", () => {
      describe("no blockchain configured", () => {
        it("is /assets/landing/blockchain/N.png", () => {
          expect(nocon_landing_test.vm.img_src('section1')).toEqual(require('./assets/landing/blockchain/section1.png'))
        })
      })

      describe("blockchain configured", () => {
        it("is /assets/landing/configured_blockchain/N.png", () => {
          expect(con_landing_test.vm.img_src('section1')).toEqual(require('./assets/landing/xrp/section1.png'))
        })
      })
    })
  })
})
