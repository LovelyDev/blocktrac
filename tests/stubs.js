/*
 * Test suite stubbed methods
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

///

// Define matchMedia, so that we can use / test media queries

import mediaQuery from "css-mediaquery";

var match_media_result;

function match_media(query){
  const matches = mediaQuery.match(query, {
                     width: window.innerWidth,
                    height: window.innerHeight,
                  });

  match_media_result = {
                  matches: matches,
                    media: query,
                 onchange: null,
              addListener: jest.fn(), // Deprecated
           removeListener: jest.fn(), // Deprecated
         addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
  };

  return match_media_result;
}

function window_resize_handler(){
  const change = mediaQuery.match(query, {
      width: window.innerWidth,
      height: window.innerHeight,
  });

  if(change != match_media_result.matches) {
    match_media_result.matches = change;
    match_media_result.dispatchEvent("change");
  }
}

function stub_match_media(){
  Object.defineProperty(window, "matchMedia", {
    writable: true,
       value: jest.fn().mockImplementation(match_media)
  });

  // Listen to resize events from window.resizeTo
  // and update the result's match
  window.removeEventListener("resize", window_resize_handler);
     window.addEventListener("resize", window_resize_handler);
}

///

// Stub ripple-lib
function stub_ripple_api(){
  jest.mock("ripple-lib")

  var ripplelib = require('ripple-lib')
  var rippleapi = {
           connect : jest.fn().mockImplementation(() => new Promise(() => {})),
           request : jest.fn().mockImplementation(() => new Promise(() => {})),
         getLedger : jest.fn(),
    isValidAddress : jest.fn(),
                on : jest.fn(),
        connection : {
                on : jest.fn()
        }
  }

  ripplelib.RippleAPI.mockImplementation(() => rippleapi)
}

///

// Stubbed network connection module

function stubbed_network_module() {
  return {
                  init : jest.fn(),
                 reset : jest.fn(),
               connect : jest.fn(),
      validate_address : jest.fn(),
      retrieve_account : jest.fn(),
           retrieve_tx : jest.fn(),
            stream_txs : jest.fn(),
    stop_streaming_txs : jest.fn()
  };
}

function stubbed_network() {
  return {
                         _module : jest.fn().mockReturnValue(stubbed_network_module()),
                        _wrap_tx : jest.fn(),
       _call_connected_callbacks : jest.fn(),
    _call_disconnected_callbacks : jest.fn(),
                           reset : jest.fn(),
                         connect : jest.fn(),
                    is_connected : jest.fn(),
                   on_connection : jest.fn(),
                  off_connection : jest.fn(),
                on_disconnection : jest.fn(),
               off_disconnection : jest.fn(),
                is_valid_address : jest.fn(),
                         account : jest.fn(),
                              tx : jest.fn(),
                      stream_txs : jest.fn(),
              stop_streaming_txs : jest.fn()
  };
}

///

const fs = require('fs')

// Load specified fixture
function load_fixture(name){
  return JSON.parse(fs.readFileSync("./tests/fixtures/" + name + ".json"))
}


// Default methods we stub
function stub_defaults(){
  stub_match_media();
  stub_ripple_api();
}

// Export for use in tests
module.exports = {
  load_fixture,
  stub_defaults,
  stubbed_network_module,
  stubbed_network
}
