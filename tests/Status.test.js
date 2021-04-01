describe("Status Page", () => {
  describe("dom", () => {
    test.todo("renders timestamp")
    test.todo("renders users")
    test.todo("renders filters")
    test.todo("renders sinks")
    test.todo("renders filter sinks")
    test.todo("renders transactions")
    test.todo("renders transactions not processed")
    test.todo("renders filter matches")
    test.todo("renders filter matches not notified")
    test.todo("renders filter notifications")
    test.todo("renders benchmarks")
    test.todo("renders meta")
    test.todo("renders transactions being processed")
    test.todo("renders filters being notified")
    test.todo("renders filters exceeding batch size")
  })

  describe("computed", () => {
    describe("date_str", () => {
      test.todo("is gmt formatted date")
    })

    describe("have_server_status", () => {
      describe("server status is populated", () => {
        test.todo("is true")
      })

      describe("server status is not populated", () => {
        test.todo("is false")
      })
    })

    describe("meta", () => {
      test.todo("is server_status.meta")
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

    decribe("txs_being_processed_str", () => {
      test.todo("formatted txs_being_processed string")
    })

    decribe("filters_being_notified_str", () => {
      test.todo("formatted filters_being_notified string")
    })

    decribe("filters_exceeding_batch_size_str", () => {
      test.todo("formatted filters_violating_batch_size string")
    })
  })

  describe("methods", () => {
    describe("#benchmark_str", () => {
      test.todo("formats benchmark value string")
    })
  })

  describe("#created", () => {
    test.todo("loads server status")
    test.todo("starts periodic loading of server status")
  })

  describe("#destroyed", () => {
    test.todo("stops periodic loading of server status")
  })
})
