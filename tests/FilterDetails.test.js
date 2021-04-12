import {mount_vue}    from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture
} from './fixtures'

import FilterDetails from '../src/FilterDetails.vue'

///

// Filter 'retrieved' from the server
const filters = load_fixture('filters');

// Filters with sinks
const filters_with_sinks = filters.filter((f) => f.Sinks && f.Sinks.length > 0)

// Filters without sinks
const filters_without_sinks = filters.filter((f) => !f.Sinks || f.Sinks.length == 0)

// Filter matches 'retrieved' from server
const filter_matches = load_fixture('filter_matches');

///

describe("FilterDetails Page", () => {
  var server_api

  beforeEach(function(){
    // Stub server_api call
    server_api = {
      methods : {
        load_filter : jest.fn(function() {
          this.active_filter = filters[0]
        }),

        load_filter_matches : jest.fn(function() {
          this.filter_matches = []
        }),
      }
    };
  })

  describe("dom", () => {
    describe("no filter_matches", () => {
      it("renders no matches content", () => {
        const filter_details = mount_vue(FilterDetails, {mixins : [server_api]})
        expect(filter_details.find("#no_matches")).toExist()
      })


      describe("#notifications_text", () => {
        describe("filter associated with sinks", () => {
          test.todo("renders sinks")
        })
      })
    })

    describe("#matched_txs_explanation", () => {
      describe("total_matches > match_history", () => {
        test.todo("renders match_history text")
      })
    })

    test.todo("renders filter matches")
  })

  describe("computed", () => {
    describe("have_sinks", () => {
      describe("no active filter", () => {
        it("is false", () => {
          const fd = mount_vue(FilterDetails, {
            mixins : [{
              methods : {
                load_filter : function() {},
                load_filter_matches : function() {}
              }
            }]
          })

          expect(fd.vm.have_sinks).toBe(false)
        })
      })

      describe("no active filter sinks (falsy)", () => {
        it("is false", () => {
          const filter_details = mount_vue(FilterDetails, {mixins : [server_api]})
          filter_details.vm.active_filter = filters_without_sinks[0];
          expect(filter_details.vm.have_sinks).toBe(false)
        })
      })

      describe("no active filter sinks (.length == 0)", () => {
        it("is false", () => {
          const filter_details = mount_vue(FilterDetails, {mixins : [server_api]})
          filter_details.vm.active_filter =
            Object.assign({}, filters_with_sinks[0], {Sinks : []})
          expect(filter_details.vm.have_sinks).toBe(false)
        })
      })

      describe("active filter associated with sinks", () => {
        it("is true", () => {
          const filter_details = mount_vue(FilterDetails, {mixins : [server_api]})
          filter_details.vm.active_filter = filters_with_sinks[0];
          expect(filter_details.vm.have_sinks).toBe(true)
        })
      })
    })

    describe("sinks_text", () => {
      test.todo("is comma seperated list of filter sinks' types/targets")
    })

    describe("match_history", () => {
      test.todo("is config filter_match_history")
    })
  })

  describe("watch", () => {
    describe("route", () => {
      test.todo("loads filter")
      test.todo("loads filter matches")
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(FilterDetails, {mixins : [server_api, _maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads filter", () => {
      mount_vue(FilterDetails, {mixins : [server_api]})
      expect(server_api.methods.load_filter).toHaveBeenCalledTimes(1);
    })

    it("loads filter matches", () => {
      mount_vue(FilterDetails, {mixins : [server_api]})
      expect(server_api.methods.load_filter_matches).toHaveBeenCalledTimes(1);
    })
  })
})
