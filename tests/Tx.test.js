import setup from './setup'
import Tx from '../src/Tx.vue'

import { shallowMount } from '@vue/test-utils'

describe("Tx Page", () => {
  var tx, hash

  beforeEach(() => {
    hash = '0D580FBBBB57CB749C5872B180901A8DF7E42699D0BBDB446FC7B781C6E42B8F'

    tx = shallowMount(Tx, {
      localVue: setup.localVue,
      store: setup.store,
      propsData: {hash : hash}
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
    describe("#has_tx", () => {
      describe("tx is set", () => {
        it("is true", () => {
          expect(Tx.computed.has_tx.call({tx : {}})).toBe(true)
        })
      })

      describe("tx is not set", () => {
        it("is false", () => {
          expect(Tx.computed.has_tx.call({})).toBe(false)
        })
      })
    })
  })

  describe("methods", () => {
    describe("msg_cb", () => {
      describe("message result is not set", () => {
        test.todo("does nothing, just returns")
      })

      describe("message result meta is not set", () => {
        test.todo("does nothing, just returns")
      })
    })
  })

  describe("#created", () => {
    test.todo("registers socket message callback")
    test.todo("registers socket open callback")
    test.todo("sends tx command")
  })

  describe("#destroyed", () => {
    test.todo("unregisters socket message callback")
  })
})