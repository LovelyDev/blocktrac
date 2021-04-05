import {shallow_mount_vue} from './setup'
import {stubbed_network}   from './stubs'
import Tx from '../src/Tx.vue'

describe("Tx Page", () => {
  var tx, hash;

  beforeEach(function(){
    hash = '0D580FBBBB57CB749C5872B180901A8DF7E42699D0BBDB446FC7B781C6E42B8F'

    tx = shallow_mount_vue(Tx, {
      propsData: {hash : hash},

      data : function(){
        return {
          tx : {transaction : {}}
        }
      },

      mocks : {
        network : stubbed_network()
      }
    })
  })

  describe("dom", () => {
    describe("#tx_hash", () => {
      it("is tx hash", () => {
        expect(tx.find("#tx_hash").text()).toEqual(hash)
      })
    })
  })

  describe("computed", () => {
    describe("has_tx", () => {
      describe("tx is set", () => {
        it("is true", () => {
          expect(tx.vm.has_tx).toBe(true)
        })
      })

      describe("tx is not set", () => {
        it("is false", () => {
          tx.setData({tx : null})
          expect(tx.vm.has_tx).toBe(false)
        })
      })
    })
  })

  describe("methods", () => {
    describe("on_tx", () => {
      it("sets tx", () => {
        const _tx = {transaction : {}}
        tx.vm.on_tx(_tx)
        expect(tx.vm.tx).toEqual(_tx)
      })
    })
  })

  describe("#created", () => {
    it("retrieves network tx", () => {
      expect(tx.vm.network.tx).toHaveBeenCalledTimes(1)
      expect(tx.vm.network.tx.mock.calls[0][0]).toEqual(hash)
      expect(tx.vm.network.tx.mock.calls[0][1]).toEqual(tx.vm.on_tx)
    })
  })
})
