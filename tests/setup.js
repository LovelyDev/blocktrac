/*
 * Test suite setup logic.
 * Similar to that done in src/main.js
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Including stubbing logic
const stubs = require('./stubs')

// Stub out methods before any application logic
beforeEach(function(){
  stubs.stub_defaults();
})

// Restore initial state after completion
afterEach(function(){
  jest.resetAllMocks();
  jest.resetModules();
  jest.restoreAllMocks();
})

// Load vue components
// XXX: implemented as seperate module as we need to ensure
//      synchronously loaded so that stubbed methods are
//      in effect (for network components and such)
const vue = require('./vue')

// Export for use in tests
module.exports = vue;
