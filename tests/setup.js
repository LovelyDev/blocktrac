import { createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue();

///

import VueReactiveCookie from 'vue-reactive-cookie'
localVue.use(VueReactiveCookie, {convertJSON : true})

///

import VueMoment     from 'vue-moment'
import moment_tz     from 'moment-timezone'

localVue.use(VueMoment, {moment_tz});

///

import Multiselect from 'vue-multiselect'
localVue.component('multiselect', Multiselect)

///

require('../src/mq')

import("../public/common.css")
import("../public/fonts.css")
require("../src/filters")

localVue.config.productionTip = false

///

import BootstrapVue from 'bootstrap-vue'

localVue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

import NetworkConnection from '../src/plugins/network-connection'
localVue.use(NetworkConnection)

///
///

import Vuex from 'vuex'
localVue.use(Vuex)

///

import VueRouter from 'vue-router'
localVue.use(VueRouter)

///

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

///
///

import { router } from '../src/router'
import { store  } from '../src/store'

export default {
  localVue,
  store,
  router
}
