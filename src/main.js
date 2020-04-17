import Vue               from 'vue'
import VueRouter         from 'vue-router'
import VueResource       from 'vue-resource'
import VueNativeSock     from 'vue-native-websocket'
import VueReactiveCookie from 'vue-reactive-cookie'
import BootstrapVue      from 'bootstrap-vue'

///

Vue.use(VueReactiveCookie)

///

import VueMoment     from 'vue-moment'
import moment_tz     from 'moment-timezone'

Vue.use(VueMoment, {moment_tz});

///

// TODO: remove old / unused components & assets

import Landing       from './Landing.vue'
import Txs           from './Txs.vue'
import About         from './About.vue'
import Help          from './Help.vue'
import FilterDetails from './FilterDetails.vue'
import FilterTester  from './FilterTester.vue'
import Profile       from './Profile.vue'
import Plans         from './Plans.vue'
import Plan          from './Plan.vue'
import Checkout      from './Checkout.vue'

import("../public/common.css")
import("../public/fonts.css")
import("./filters")

Vue.config.productionTip = false

///

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

Vue.use(VueRouter)

const routes = [
  { path: '/',         component: Landing  },
  { path: '/txs',      component: Txs      },
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

Vue.use(VueResource)
Vue.use(VueNativeSock, config.RIPPLE_WS,
                       { format: 'json',
                           store: store,
                     reconnection: true,
               reconnectionDelay : config.RETRY_SECONDS * 1000});

///

new Vue({
  router : router,
  store  : store
}).$mount('#app')
