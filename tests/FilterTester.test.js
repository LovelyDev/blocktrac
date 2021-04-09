import {mount_vue}    from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture
} from './fixtures'

import FilterTester from '../src/FilterTester.vue'

///

// Filter 'retrieved' from the server
const filters = load_fixture('filters');

///

describe("FilterTester Page", () => {
  var server_api;

  beforeEach(function(){
    server_api = {
      methods : {
        load_filter : jest.fn(function(){
          this.active_filter = filters[0]
        })
      }
    }
  })

  describe("dom", () => {
    describe("no matched_tests", () => {
      it("renders no matches content", () => {
        const filter_tester = mount_vue(FilterTester, {mixins : [server_api]})
        expect(filter_tester.find("#no_matches").exists()).toBe(true)
      })

      describe("#duplicate_link", () => {
        test.todo("launches duplicate_filter modal")
      })
    })

    test.todo("renders matched tests")
  })

  describe("watch", () => {
    describe("active_filter", () => {
      test.todo("applies filter jsonpath to tests and populates matched_tests")
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", async() => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(FilterTester, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads filter", () => {
      mount_vue(FilterTester, {mixins : [server_api]})
      expect(server_api.methods.load_filter).toHaveBeenCalledTimes(1);
    })
  })
})
