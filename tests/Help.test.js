import {
  mount_vue,
  next_tick
} from './setup'

import Help from '../src/Help.vue'
import {breakpoints} from '../src/mq'

describe("Help Page", () => {
  describe("dom", () => {
    it("renders categories", async () => {
      const help = mount_vue(Help)

      await next_tick(help)
      const nav = help.findAll("#help_categories .list-group-item.help_category")
      expect(nav.length).toBe(help.vm.categories.length)

      for(var n = 0; n < nav.length; n += 1){
        expect(nav.at(n).find(".category_title").text()).toEqual(help.vm.categories[n])
      }
    })

    describe("category active", () => {
      test.todo("sets active list-group-item")
    })

    describe("mq <= md", () => {
      it("renders multiselect categories", async () => {
        global.innerWidth = breakpoints.md - 1;

        const help = mount_vue(Help)
        await next_tick(help)
        expect(help.get(".multiselect"))
      })

      describe("category active", () => {
        test.todo("selects category")
      })
    })

    test.todo("renders help topics' title and content")
  })

  describe("computed", () => {
    describe("content", () => {
      test.todo("maps icons and topics to categories")
      test.todo("interpolates ziti config")
    })

    describe("categories", () => {
      it("is help categories", () => {
        const help = mount_vue(Help)
        expect(help.vm.categories).toEqual(Object.keys(help.vm.content))
      })
    })

    describe("topics", () => {
      it("is active help topics", () => {
        const help = mount_vue(Help)
        help.setData({active : help.vm.categories[1]});
        expect(help.vm.topics).toEqual(help.vm.content[help.vm.active].topics)
      })
    })
  })

  describe("methods", () => {
    describe("#is_active", () => {
      describe("category is active", () => {
        it("is true", () => {
          const help = mount_vue(Help)
          expect(help.vm.is_active(help.vm.active)).toBe(true)
        })
      })

      describe("category is not active", () => {
        it("is false", () => {
          const help = mount_vue(Help)
          expect(help.vm.is_active("foobar")).toBe(false)
        })
      })
    })

    describe("#set_active", () => {
      it("sets active category", () => {
        const help = mount_vue(Help)
        help.vm.set_active(help.vm.categories[1]);
        expect(help.vm.active).toEqual(help.vm.categories[1])
      })
    })

    describe("#icon_for", () => {
      test.todo("requires & returns icon for category")
    })
  })

  describe("#created", () => {
    describe("category is specified", () => {
      it("sets active category from capitalized category", () => {
        const help1 = mount_vue(Help)
        const help2 = mount_vue(Help, {
          propsData : {
            category : help1.vm.categories[1].toLowerCase()
          }
        })
        expect(help2.vm.active).toEqual(help1.vm.categories[1])
      })

      describe("category is not valid", () => {
        it("does not set category", () => {
          const help = mount_vue(Help, {
            propsData : {
              category : 'foobar'
            }
          })

          expect(help.vm.active).toEqual(help.vm.categories[0])
        })
      })
    })

    describe("category is not specified", () => {
      it("does not set category", () => {
        const help = mount_vue(Help);
        expect(help.vm.active).toEqual(help.vm.categories[0])
      })
    })
  })
})
