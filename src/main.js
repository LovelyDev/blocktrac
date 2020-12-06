/*
 * Main application entry point.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

import Vue from 'vue'

///

import VueReactiveCookie from 'vue-reactive-cookie'
Vue.use(VueReactiveCookie, {convertJSON : true})

///

import VueMoment     from 'vue-moment'
import moment_tz     from 'moment-timezone'

Vue.use(VueMoment, {moment_tz});

///

import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)
import "vue-multiselect/dist/vue-multiselect.min.css"

///

require('./mq')

import Landing        from './Landing'
import Maintenance    from './Maintenance'
import Txs            from './Txs'
import Tx             from './Tx'
import Account        from './Account'
import About          from './About'
import Help           from './Help'
import JSONPath       from './JSONPath'
import TermsOfService from './TermsOfService'
import FilterDetails  from './FilterDetails'
import FilterTester   from './FilterTester'
import Notifications  from './Notifications'
import Notification   from './Notification'
import Profile        from './Profile'
import ConfirmEmail   from './ConfirmEmail'
import ResetPassword  from './ResetPassword'
import Plans          from './Plans'
import Plan           from './Plan'
import Checkout       from './Checkout'

import("../public/common.css")
import("../public/fonts.css")
import("./filters")

Vue.config.productionTip = false

///

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

// TODO new user guide

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Application routes definition
const routes = [
  { path: '/',         component: Landing  },
  { path: '/maintenance',
                       component: Maintenance },
  { path: '/txs',      component: Txs      },
  { path: '/tx/:hash', component: Tx,
                           props: true     },
  { path: '/account/:id',
                       component: Account,
                           props: true     },
  { path: '/about',    component: About    },
  { path: '/help',     component: Help     },
  { path: '/help/:category',
                       component: Help,
                       props: true         },
  { path: '/jsonpath', component: JSONPath },
  { path: '/terms',
                 component: TermsOfService },
  { path: '/profile',  component: Profile  },

  { path: '/plans',    component: Plans    },
  { path: '/plan',     component: Plan,
                            name: 'plan',
                           props: true     },

  { path: '/checkout', component: Checkout,
                            name: 'checkout',
                           props: true     },

  { path: '/confirm/:code', component: ConfirmEmail,
                                 name: 'confirm',
                                props: true},

  { path: '/reset/:code', component: ResetPassword,
                               name: 'reset',
                              props: true},

  { path: '/filter/:id', component: FilterDetails,
    props: function(route){
      return {id : parseInt(route.params.id) };
    }
  },

  { path: '/test/:id', component: FilterTester,
    props: function(route){
      return {id : parseInt(route.params.id) };
    }
  },

  { path : '/notifications', component: Notifications },

  { path: '/notification/:id', component: Notification,
    props: function(route){
      return {id : parseInt(route.params.id) };
    }
  }
]

const router = new VueRouter({
  mode : "history",
  routes : routes,

  // always scroll to top on nav
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

///

import config    from './config'
import { store } from './store'

import VueResource   from 'vue-resource'
import VueNativeSock from 'vue-native-websocket'

// Automatically connect to websocket on startup
Vue.use(VueResource)
Vue.use(VueNativeSock, config.RIPPLE_WS,
                       { format: 'json',
                          store: store,
                    reconnection: true,
               reconnectionDelay: config.RETRY_SECONDS * 1000});

///

// We also use various methods in the ripple api
const RippleAPI = require('ripple-lib').RippleAPI;
Vue.prototype.$rippleAPI = new RippleAPI({
  server: config.RIPPLE_WS
});

///

import DocVars from './doc-vars.js';
Vue.use(DocVars)

///

new Vue({
  router : router,
  store  : store
}).$mount('#app')
