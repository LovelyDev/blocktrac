import {mount_vue} from './setup'

import {load_fixture} from './stubs'

import util from '../src/util'

import Status from '../src/Status.vue'

// Server Status 'retrieved' from the server
const server_status = load_fixture('server_status');

describe("Status Page", () => {
  var stat, server_api

  beforeEach(function(){
    server_api = {
      methods : {
        load_server_status : jest.fn(function(){
          this.server_status = server_status
        })
      }
    }

    stat = mount_vue(Status, {
      mixins : [server_api]
    })
  })

  describe("dom", () => {
    it("renders timestamp", () => {
      const now = Date.now()
      jest.spyOn(Date, 'now').mockImplementation(() => now);

      stat = mount_vue(Status, {
        mixins : [server_api]
      })

      expect(stat.find("#date").text()).toEqual((new Date(now)).toGMTString())
    })

    it("renders users", () => {
      expect(stat.find("#users").text()).toEqual("Users: " + util.delim_value(server_status.users))
    })

    it("renders filters", () => {
      expect(stat.find("#filters").text()).toEqual("Filters: " + util.delim_value(server_status.filters))
    })

    it("renders sinks", () => {
      expect(stat.find("#sinks").text()).toEqual("Sinks: " + util.delim_value(server_status.sinks))
    })

    it("renders filter sinks", () => {
      expect(stat.find("#filter_sinks").text()).toEqual("Filter Sinks: " + util.delim_value(server_status.filter_sinks))
    })

    it("renders transactions", () => {
      expect(stat.find("#txs").text()).toEqual("Transactions: " + util.delim_value(server_status.txs))
    })

    it("renders transactions not processed", () => {
      expect(stat.find("#txs_to_process").text()).toEqual("Not processed: " + util.delim_value(server_status.txs_to_process))
    })

    describe("txs_to_process outage", () => {
      test.todo("renders transactions not processed error")
    })

    it("renders filter matches", () => {
      expect(stat.find("#filter_matches").text()).toEqual("Filter Matches: " + util.delim_value(server_status.filter_matches))
    })

    it("renders filter matches not notified", () => {
      expect(stat.find("#non_notified_filter_matches").text()).toEqual("Not Notified: " + util.delim_value(server_status.non_notified_filter_matches))
    })

    it("renders filter notifications", () => {
      expect(stat.find("#notifications").text()).toEqual("Notifications: " + util.delim_value(server_status.notifications))
    })

    test.todo("renders benchmarks")

    describe("benchmark outage", () => {
      test.todo("renders benchmark error")
    })

    test.todo("renders meta")

    test.todo("renders transactions being processed")

    test.todo("renders filters being notified")

    test.todo("renders filters exceeding batch size")
  })

  describe("computed", () => {
    describe("have_server_status", () => {
      describe("server status is populated", () => {
        it("is true", () => {
          expect(stat.vm.have_server_status).toBe(true)
        })
      })

      describe("server status is not populated", () => {
        it("is false", () => {
          stat = mount_vue(Status, {
            mixins : [{
              methods : {
                load_server_status : jest.fn()
              }
            }]
          })

          expect(stat.vm.have_server_status).toBe(false)
        })
      })
    })

    describe("txs_to_process", () => {
      it("is server_status.txs_to_process", () => {
        expect(stat.vm.txs_to_process).toEqual(server_status.txs_to_process)
      })
    })

    describe("meta", () => {
      test.todo("is server_status.meta")
      test.todo("sets benchmark flag on benchmarks")
      test.todo("sets parsed on benchmarks")
      test.todo("parses started and updated dates")
    })

    describe("meta_keys", () => {
      test.todo("is metadata keys")
    })

    describe("benchmarks", () => {
      test.todo("is benchmark metadata keys")
    })

    describe("other_meta", () => {
      test.todo("is non-benchmark metadata keys")
    })

    describe("txs_being_processed_str", () => {
      test.todo("formatted txs_being_processed string")
    })

    describe("filters_being_notified_str", () => {
      test.todo("formatted filters_being_notified string")
    })

    describe("filters_exceeding_batch_size_str", () => {
      test.todo("formatted filters_violating_batch_size string")
    })

    describe("outages", () => {
      describe("txs_to_process", () => {
        describe("txs_to_process > outage threshold", () => {
          test.todo("is true")
        })

        describe("txs_to_process <= outage threshold", () => {
          test.todo("is false")
        })
      })
    })
  })

  describe("methods", () => {
    describe("#benchmark_outage", () => {
      describe("benchmark exceeded outage threshold", () => {
        test.todo("returns true")
      })

      describe("benchmark did not exceed outage threshold", () => {
        test.todo("returns false")
      })
    })
  })

  describe("#created", () => {
    it("loads server status", () => {
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1);
    })

    test.todo("starts periodic loading of server status")
  })

  describe("#destroyed", () => {
    test.todo("stops periodic loading of server status")
  })
})
