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

import Landing from './Landing.vue'
import About   from './About.vue'
import Help    from './Help.vue'
import Filters from './Filters.vue'
import Profile from './Profile.vue'

import("../public/common.css")
import("./filters")

Vue.config.productionTip = false

///

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

Vue.use(VueRouter)

const routes = [
  { path: '/',          component: Landing   },
  { path: '/about',     component: About     },
  { path: '/help',      component: Help      },
  { path: '/filters',   component: Filters   },
  { path: '/profile',   component: Profile   }
]

const router = new VueRouter({
  mode : "history",
  routes : routes
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
