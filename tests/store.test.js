import {shallow_mount_vue} from './setup'

const Component = {
  render() {}
}

describe("store", () => {
  var component

  beforeEach(() => {
    component = shallow_mount_vue(Component)
  })

  describe("#set_network_initialize", () => {
    it("sets network_initialized variable", () => {
      component.vm.$store.commit('set_network_initialized', true)
      expect(component.vm.$store.state.network_initialized).toBe(true)
    })
  })

  describe("#set_selected_blockchain", () => {
    it("sets selected_blockchain variable", () => {
      component.vm.$store.commit('set_selected_blockchain', 'xrp')
      expect(component.vm.$store.state.selected_blockchain).toBe('xrp')
    })
  })

  describe("#set_user", () => {
    it("sets user properties", () => {
      const now = new Date();

      component.vm.$store.commit('set_user', {
                     email : 'e@ma.il',
          membership_level : 'standard',
                   profile : {foo : 'bar'},
              renewal_date : now,
           has_credit_card : true,
        additional_filters : 5,
          additional_sinks : 3,
                Privileges : ['p1', 'p2']
      })

      expect(component.vm.$store.state.user.email).toEqual('e@ma.il')
      expect(component.vm.$store.state.user.membership_level).toEqual('standard')
      expect(component.vm.$store.state.user.profile).toEqual({foo : 'bar'})
      expect(component.vm.$store.state.user.renewal_date).toEqual(now)
      expect(component.vm.$store.state.user.has_credit_card).toEqual(true)
      expect(component.vm.$store.state.user.additional_filters).toEqual(5)
      expect(component.vm.$store.state.user.additional_sinks).toEqual(3)
      expect(component.vm.$store.state.user.privileges).toEqual(['p1', 'p2'])
    })
  })

  describe("#clear_user", () => {
    it("clears user properties", () => {
      component.vm.$store.commit('clear_user')

      expect(component.vm.$store.state.user.email).toEqual('')
      expect(component.vm.$store.state.user.membership_level).toEqual('')
      expect(component.vm.$store.state.user.profile).toEqual('')
      expect(component.vm.$store.state.user.renewal_date).toEqual('')
      expect(component.vm.$store.state.user.has_credit_card).toEqual(false)
      expect(component.vm.$store.state.user.additional_filters).toEqual(0)
      expect(component.vm.$store.state.user.additional_sinks).toEqual(0)
      expect(component.vm.$store.state.user.privileges).toEqual([])
    })
  })

  describe("#toggle_paused_txs", () => {
    it("toggles paused_txs property", () => {
      component.vm.$store.commit('toggle_paused_txs')
      expect(component.vm.$store.state.paused_txs).toBe(true)

      component.vm.$store.commit('toggle_paused_txs')
      expect(component.vm.$store.state.paused_txs).toBe(false)
    })
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
