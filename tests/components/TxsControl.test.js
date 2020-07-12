describe("TxsControl", () => {
  describe("dom", () => {
    describe("#txs_play_pause", () => {
      describe("click event", () => {
        test.todo("calls play_pause")

        describe("paused", () => {
          test.todo("renders play")
        })

        describe("!paused", () => {
          test.todo("renders paused")
        })
      })
    })

    describe("#clear_txs", () => {
      describe("click event", () => {
        test.todo("clears txs")
      })
    })

    describe("logged_in and mq <= md", () => {
      test.todo("launches settings modal")
    })
  })

  describe("computed", () => {
    describe("paused", () => {
      test.todo("store.paused_txs")
    })
  })

  describe("methods", () => {
    describe("play_pause", () => {
      test.todo("toggle_paused_txs")
    })

    describe("clear_txs", () => {
      test.todo("clears txs")
    })
  })
})
