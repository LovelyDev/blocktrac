/*
 * Test suite stubbed methods
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

import mediaQuery from "css-mediaquery";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
        const instance = {
            matches: mediaQuery.match(query, {
                width: window.innerWidth,
                height: window.innerHeight,
            }),
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };

        // Listen to resize events from window.resizeTo and update the instance's match
        window.addEventListener("resize", () => {
            const change = mediaQuery.match(query, {
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (change != instance.matches) {
                instance.matches = change;
                instance.dispatchEvent("change");
            }
        });

        return instance;
    }),
});

///

// Stub ripple-lib
var ripplelib, rippleapi

jest.mock("ripple-lib")
ripplelib = require('ripple-lib')
rippleapi = {
     connect : jest.fn().mockImplementation(() => new Promise(() => {})),
     request : jest.fn().mockImplementation(() => new Promise(() => {})),
   getLedger : jest.fn(),
          on : jest.fn(),
  connection : {
          on : jest.fn()
  }
}
ripplelib.RippleAPI.mockImplementation(() => rippleapi)
