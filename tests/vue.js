// Vue initializers
import { vue_init } from '../src/init'

import {
  vue_init as store_vue_init
} from '../src/store'

import {
  vue_init as router_vue_init
} from '../src/router'

///

// Used to create vue instance and components
import {
  createLocalVue,
  mount,
  shallowMount
} from "@vue/test-utils"

// Vue initialization
function create_vue(){
  // Create vue instance
  const localVue = createLocalVue();

  // Initialize
  vue_init(localVue)
  const store  = store_vue_init(localVue)
  const router = router_vue_init(localVue)

  return {
    localVue,
    store,
    router
  }
}

// Mount component
function mount_vue(component, opts){
  const vue = create_vue();

  return mount(component, Object.assign({
    localVue: vue.localVue,
       store: vue.store,
      router: vue.router
  }, opts))
}

// Shallow mount component
function shallow_mount_vue(component, opts){
  const vue = create_vue();

  return shallowMount(component, Object.assign({
    localVue: vue.localVue,
       store: vue.store,
      router: vue.router
  }, opts))
}

///

// Export for use in tests
module.exports = {
  create_vue,
  mount_vue,
  shallow_mount_vue
}
