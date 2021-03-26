/*
 * Test suite setup logic
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Stub out methods before any application logic
require('./stubs')

// Synchronously initialize app after stubbing is done
const {
  localVue,
  store,
  router
} = require('./init')

// Export for use in tests
export default {
  localVue,
  store,
  router
}
