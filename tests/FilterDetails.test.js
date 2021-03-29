import {mount_vue}    from './setup'
import {load_fixture} from './stubs'

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

// Helper to setup the base component
function filter_details(opts){
  // Stub server_api call
  const server_api= {
    methods : {
      load_filter : function() {
        this.active_filter = (opts || {}).active_filter || filters[0]
      },

      load_filter_matches : function() {
        this.filter_matches = (opts || {}).matches || []
      },
    }
  };

  // Create new options w/ the stubbed server api mixin
  const mopts = Object.assign({}, { mixins : [server_api] }, opts)

  // create and return the component
  return mount_vue(FilterDetails, mopts)
}

///

describe("FilterDetails Page", () => {
  describe("dom", () => {
    describe("no filter_matches", () => {
      it("renders no matches content", () => {
        expect(filter_details().find("#no_matches_text").exists()).toBe(true)
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
          const fd = filter_details();
                fd.vm.active_filter = filters_without_sinks[0];
          expect(fd.vm.have_sinks).toBe(false)
        })
      })

      describe("no active filter sinks (.length == 0)", () => {
        it("is false", () => {
          const fd = filter_details();
                fd.vm.active_filter = Object.assign({}, filters_with_sinks[0], {Sinks : []})
          expect(fd.vm.have_sinks).toBe(false)
        })
      })

      describe("active filter associated with sinks", () => {
        it("is true", () => {
          const fd = filter_details();
                fd.vm.active_filter = filters_with_sinks[0];
          expect(fd.vm.have_sinks).toBe(true)
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
    describe("MAINTENANCE_MODE", () => {
      test.todo("redirects to maintenance page")
    })

    test.todo("loads filter")
    test.todo("loads filter matches")
  })
})
