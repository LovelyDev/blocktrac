/*
 * Test suite fixtures
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

const fs = require('fs')

// Load specified fixture
function load_fixture(name){
  return JSON.parse(fs.readFileSync("./tests/fixtures/" + name + ".json"))
}

// Export for use in tests
module.exports = {
  load_fixture
}
