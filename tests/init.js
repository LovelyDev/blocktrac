/*
 * Test suite initiazation logic.
 * Similar to theat done in src/main.js
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

// Local Vue instance
import { createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue();

// Vue initializers
import { vue_init } from '../src/init'

import {
  vue_init as store_vue_init
} from '../src/store'

import {
  vue_init as router_vue_init
} from '../src/router'

// Vue initialization
vue_init(localVue)
const store  = store_vue_init(localVue)
const router = router_vue_init(localVue)

module.exports = {
  localVue,
  store,
  router
}
