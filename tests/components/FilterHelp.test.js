import {shallow_mount_vue} from '../setup'

import FilterHelp from '../../src/components/FilterHelp'

describe("FilterHelp", () => {
  describe("methods", () => {
    describe("set_filter", () => {
      it("emits 'set' event", () => {
        const filter_help = shallow_mount_vue(FilterHelp)
        filter_help.vm.$emit = jest.fn()

        filter_help.vm.set_filter({currentTarget : {textContent : "  abc  "}})
        expect(filter_help.vm.$emit).toHaveBeenCalledTimes(1)
        expect(filter_help.vm.$emit.mock.calls[0][0]).toEqual('set')
        expect(filter_help.vm.$emit.mock.calls[0][1]).toEqual('abc')
      })
    })
  })
})
