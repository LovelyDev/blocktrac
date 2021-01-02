describe("network-connection plugin", () => {
  describe("xrp network", () => {
    test.todo("sets network.RippleAPI")
    test.todo("sets network.ripple_api")

    describe("on ripple_api error", () => {
      test.todo("calls disconnect callbacks")
      test.todo("throttle connects to network")
    })

    describe("on connect", () => {
      test.todo("calls connected callbcks")
    })

    describe("on connection error", () => {
      test.todo("throttle connects to network")
    })
  })

  describe("xlm network", () => {
    test.todo("sets network.StellarSdk")
    test.todo("sets network.stellar_server")
    test.todo("sets test connection interval")

    describe("test_xlm_connection", () => {
      test.todo("retrieves base fee")

      describe("on new connection", () => {
        test.todo("calls connected callbacks")
      })

      describe("on new disconnection", () => {
        test.todo("calls disconnect callbacks")
      })
    })
  })

  describe("#is_connected", () => {
    test.todo("returns connection status")
  })

  describe("#on_connection", () => {
    test.todo("adds connection callback")
    describe("connected", () => {
      test.todo("calls callback")
    })
  })

  describe("#on_disconnection", () => {
    test.todo("adds disconnection callback")
    describe("not connected", () => {
      test.todo("calls callback")
    })
  })

  describe("#is_valid_address", () => {
    test.todo("validates the specified address")
  })

  describe("#account", () => {
    test.todo("retreives account")
    test.todo("calls callback with account")
  })

  describe("#tx", () => {
    test.todo("retreives tx")
    test.todo("calls callback with tx")
  })

  describe("#stream_txs", () => {
    test.todo("subscribes to tx stream")
    describe("on transaction", () => {
      test.todo("invokes callback with transaction")
    })
  })

  describe("#stop_streaming_txs", () => {
    test.todo("unsubscribes to tx stream")
  })
})
