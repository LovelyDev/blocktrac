describe("store", () => {
  describe("#set_user", () => {
    test.todo("sets user properties")
  })

  describe("#clear_user", () => {
    test.todo("clears user properties")
  })

  describe("#toggle_paused_txs", () => {
    test.todo("toggles paused_txs property")
  })

  describe("#update_tx_filter", () => {
    describe("filter is set and is not valid jsonpath", () => {
      test.todo("does not set filter")
    })

    test.todo("sets filter")

    describe("filter is set", () => {
      test.todo("removes txs that do not match filter")
    })
  })

  describe("#add_tx", () => {
    describe("txs are paused", () => {
      test.todo("does not add tx")
    })

    describe("filter is set", () => {
      describe("tx does not match filter", () => {
        test.todo("does not add tx")
      })
    })

    describe("tx categories are set and do not include tx category", () => {
      test.todo("does not add tx")
    })

    test.todo("sets loading_txs to false")

    test.todo("prepends tx")
    test.todo("caps number of txs to TX_HISTORY")
    test.todo("updates 'ALL' tally")
    test.todo("updates category tally")
  })

  describe("#clear_tx_categories", () => {
    test.todo("empties tx categories")
  })

  describe("#toggle_tx_category", () => {
    describe("tx category enabled", () => {
      test.todo("removes tx category")
    })

    describe("tx category not enabled", () => {
      test.todo("adds tx category")
    })

    test.todo("removes txs not in enabled categories")
  })

  describe("#clear_txs", () => {
    test.todo("empties txs")
  })

  describe("#set_templates", () => {
    test.todo("sets templates property")
  })

  describe("#set_sinks", () => {
    test.todo("sets sinks property")
  })

  describe("#set_filters", () => {
    test.todo("sets filters property")
  })

  describe("#set_filter_matches", () => {
    test.todo("sets filter_matches property")
  })

  describe("#set_notifications", () => {
    test.todo("sets notifications property")
  })

  describe("#set_active_filter", () => {
    test.todo("sets active_filter property")
  })

  describe("#set_in_progress_filter", () => {
    test.todo("sets in_progress_filter property")
  })

  describe("#clear_in_progress_filter", () => {
    test.todo("clear in_progress_filter property")
  })

  describe("#on_open_socket", () => {
    describe("socket is connected", () => {
      test.todo("calls callback")
    })

    test.todo("adds callback to socket_open callbacks")
  })

  describe("#on_socket_message", () => {
    test.todo("adds callback to socket_msg callbacks")
  })

  describe("#rm_socket_message", () => {
    test.todo("removes callback from socket_msg callbacks")
  })

  describe("on socket open", () => {
    test.todo("sets isConnected")
    test.todo("calls socket open callbacks")
  })

  describe("on socket close", () => {
    test.todo("sets isConnected to flags")
  })

  describe("on socket message", () => {
    describe("callback for message id exists", () => {
      test.todo("invokes callback")
      test.todo("deletes callback")
    })

    test.todo("calls socket message callbacks")
  })

  describe("on socket reconnect error", () => {
    test.todo("sets reconnectError")
  })
})
