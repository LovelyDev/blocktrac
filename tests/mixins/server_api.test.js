import {shallow_mount_vue} from '../setup'

import config from '../../src/config/config'

import ServerAPI from '../../src/mixins/server_api'

const Component = {
  render() {},
  mixins : [ServerAPI]
}

describe("server_api", () => {
  var component

  beforeEach(function(){
    component = shallow_mount_vue(Component)
  })

  describe("computed", () => {
    describe("#backend_url", () => {
      it("is config.BACKEND_URL", () => {
        expect(component.vm.backend_url).toEqual(config.BACKEND_URL)
      })
    })

    describe("#templates", () => {
      it("sets/gets templates", () => {
        const templates = ['t1', 't2']
        component.vm.templates = templates
        expect(component.vm.templates).toEqual(templates)
        expect(component.vm.$store.state.templates).toEqual(templates)
      })
    })

    describe("#sinks", () => {
      it("sets/gets sinks", () => {
        const sinks = ['s1', 's2']
        component.vm.sinks = sinks
        expect(component.vm.sinks).toEqual(sinks)
        expect(component.vm.$store.state.sinks).toEqual(sinks)
      })
    })

    describe("#filters", () => {
      it("sets/gets filters", () => {
        const filters = ['f1', 'f2']
        component.vm.filters = filters
        expect(component.vm.filters).toEqual(filters)
        expect(component.vm.$store.state.filters).toEqual(filters)
      })
    })

    describe("#notifications", () => {
      it("sets/gets notifications", () => {
        const notifications = ['n1', 'n2']
        component.vm.notifications = notifications
        expect(component.vm.notifications).toEqual(notifications)
        expect(component.vm.$store.state.notifications).toEqual(notifications)
      })
    })

    describe("#server_status", () => {
      it("sets/gets server_status", () => {
        const server_status = {stat : 'us'}
        component.vm.server_status = server_status
        expect(component.vm.server_status).toEqual(server_status)
        expect(component.vm.$store.state.server_status).toEqual(server_status)
      })
    })

    describe("#active_filter", () => {
      it("sets/gets active_filter", () => {
        const active_filter = {active : 'filter'}
        component.vm.active_filter = active_filter
        expect(component.vm.active_filter).toEqual(active_filter)
        expect(component.vm.$store.state.active_filter).toEqual(active_filter)
      })
    })
  })

  describe("methods", () => {
    describe("#set_active_filter", () => {
      describe("filters includes filter", () => {
        test.todo("replaces filter")
      })

      test.todo("adds filter to filters")

      test.todo("redirect to /filter/filter.id")
    })

    describe("#load_templates", () => {
      test.todo("submits templates request")

      describe("success result", () => {
        test.todo("sets templates")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_sinks", () => {
      test.todo("submits sinks request")

      describe("success result", () => {
        test.todo("sets sinks")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filters", () => {
      test.todo("submits filters request")

      describe("success result", () => {
        test.todo("sets filters")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filter", () => {
      test.todo("submits filter request")

      describe("success result", () => {
        test.todo("sets active filter")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_filter_matches", () => {
      test.todo("submits filter_matches request")

      describe("success result", () => {
        test.todo("sets converted filter_matches")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#load_notifications", () => {
      test.todo("submits notifications request")

      describe("success result", () => {
        test.todo("sets notifications")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })

    describe("#update_user", () => {
      test.todo("submits user request")
      test.todo("returns request promise")
    })

    describe("#purchase_plan", () => {
      test.todo("submits purchase request")
      test.todo("returns request promise")
    })

    describe("#cancel_subscription", () => {
      test.todo("submits cancel subscription request")
      test.todo("returns request promise")
    })

    describe("#reset_password", () => {
      test.todo("submits reset password request")
      test.todo("returns request promise")
    })

    describe("#confirm_email", () => {
      test.todo("submits confirm email request")
      test.todo("returns request promise")
    })

    describe("#contact", () => {
      test.todo("submits contact request")
      test.todo("returns request promise")
    })

    describe("#create_sink", () => {
      test.todo("submits create sink request")
      test.todo("returns request promise")
    })

    describe("#delete_sink", () => {
      test.todo("submits delete sink request")
      test.todo("returns request promise")
    })

    describe("#create_filter", () => {
      test.todo("submits create filter request")
      test.todo("returns request promise")
    })

    describe("#delete_filter", () => {
      test.todo("submits delete filter request")
      test.todo("returns request promise")
    })

    describe("#update_filter", () => {
      test.todo("submits update filter request")
      test.todo("returns request promise")
    })

    describe("#delete_filter", () => {
      test.todo("submits delete filter request")
      test.todo("returns request promise")
    })

    describe("#load_notifications", () => {
      test.todo("submits notification request")
      test.todo("returns request promise")
    })
  })
 })
