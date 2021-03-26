import setup from './setup'
import Help from '../src/Help.vue'
import { mount } from '@vue/test-utils'

describe("Help Page", () => {
  describe("dom", () => {
    it("renders categories", () => {
      //global.innerWidth = 5000;
      var help = mount(Help, {
        localVue: setup.localVue,
           store: setup.store,
          router: setup.router
      })

      help.vm.$nextTick(() => {
        const nav = help.findAll("#help_categories .list-group-item.help_category")
      })
    })

    describe("category active", () => {
      test.todo("sets active list-group-item")
    })

    describe("mq <= md", () => {
      test.todo("renders multiselect categories")

      describe("category active", () => {
        test.todo("selects category")
      })
    })

    test.todo("renders help topics' title and content")
  })

  describe("data", () => {
    test.todo("maps icons and topics to categories")
    test.todo("interpolates ziti config")
  })

  describe("computed", () => {
    describe("#categories", () => {
      test.todo("is help categories")
    })

    describe("#topics", () => {
      test.todo("is active help topics")
    })
  })

  describe("methods", () => {
    describe("#is_active", () => {
      describe("category is active", () => {
        test.todo("is true")
      })

      describe("category is not active", () => {
        test.todo("is false")
      })
    })

    describe("#set_active", () => {
      test.todo("sets active category")
    })

    describe("#icon_for", () => {
      test.todo("requires & returns icon for category")
    })
  })

  describe("#created", () => {
    describe("category is specified", () => {
      test.todo("sets active category from capitalized category")

      describe("category is not valid", () => {
        test.todo("does not set category")
      })
    })

    describe("category is not specified", () => {
      test.todo("does not set category")
    })
  })
})
