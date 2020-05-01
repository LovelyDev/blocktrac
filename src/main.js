import Vue           from 'vue'

///

import VueReactiveCookie from 'vue-reactive-cookie'
Vue.use(VueReactiveCookie)

///

import VueMoment     from 'vue-moment'
import moment_tz     from 'moment-timezone'

Vue.use(VueMoment, {moment_tz});

///

require('./mq')

// TODO: remove old / unused components & assets

import Landing       from './Landing'
import Txs           from './Txs'
import Tx            from './Tx'
import About         from './About'
import Help          from './Help'
import FilterDetails from './FilterDetails'
import FilterTester  from './FilterTester'
import Profile       from './Profile'
import Plans         from './Plans'
import Plan          from './Plan'
import Checkout      from './Checkout'

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

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/',         component: Landing  },
  { path: '/txs',      component: Txs      },
  { path: '/tx/:hash', component: Tx,
                           props: true     },
  { path: '/about',    component: About    },
  { path: '/help',     component: Help     },
  { path: '/profile',  component: Profile  },
  { path: '/plans',    component: Plans    },
  { path: '/plan',     component: Plan,
                            name: 'plan',
                           props: true     },
  { path: '/checkout', component: Checkout,
                            name: 'checkout',
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

Vue.use(VueResource)
Vue.use(VueNativeSock, config.RIPPLE_WS,
                       { format: 'json',
                           store: store,
                     reconnection: true,
               reconnectionDelay : config.RETRY_SECONDS * 1000});

///

const RippleAPI = require('ripple-lib').RippleAPI;
Vue.prototype.$rippleAPI = new RippleAPI({
  server: config.RIPPLE_WS
});

///

new Vue({
  router : router,
  store  : store
}).$mount('#app')
