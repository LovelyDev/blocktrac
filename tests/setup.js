/*
 * Test suite setup logic.
 * Similar to that done in src/main.js
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Stub out methods before any application logic
require('./stubs')

// Load vue components
// XXX: implemented as seperate module as we need to ensure
//      synchronously loaded so that stubbed methods are
//      in effect (for network components and such)
const vue = require('./vue')

// Export for use in tests
module.exports = vue;
