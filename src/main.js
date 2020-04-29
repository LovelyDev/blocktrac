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

import VueMq from 'vue-mq'

// From bootstrap:
// xs - 0 on up
// sm - 576 on up
// md - 768 on up
// lg - 992 on up
// xl - 1200 on up
//
// vue-mq defines upper-bound of media-query
// range hence levels are shifted
Vue.use(VueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1450,
    xlp: Infinity // added this one
  }
})

// Custom mixin to define mq helpers
// lt = less than
// gt = greater than
Vue.mixin({
  computed : {
    mq_xs : function(){
      return this.$mq == 'xs';
    },

    mq_gt_xs : function(){
      return this.$mq != 'xs;'
    },

    mq_sm : function(){
      return this.$mq == 'sm';
    },

    mq_lt_sm : function(){
      return this.$mq == 'xs';
    },

    mq_gt_sm : function(){
      return ['md', 'lg', 'xl'].includes(this.$mq);
    },

    mq_md : function(){
      return this.$mq == 'md';
    },

    mq_lt_md : function(){
      return ['xs', 'sm'].includes(this.$mq);
    },

    mq_gt_md : function(){
      return ['lg', 'xl'].includes(this.$mq);
    },

    mq_lg : function(){
      return this.$mq == 'lg';
    },

    mq_lt_lg : function(){
      return ['xs', 'sm', 'md'].includes(this.$mq);
    },

    mq_gt_lg : function(){
      return this.$mq == 'xl'
    },

    mq_xl : function(){
      return this.$mq == 'xl';
    },

    mq_lt_xl : function(){
      return this.$mq != 'xl';
    }
  },

  methods : {
    mq_in : function(mq){
      return mq.includes(this.$mq);
    }
  }
})

///

// TODO: remove old / unused components & assets

import Landing       from './Landing.vue'
import Txs           from './Txs.vue'
import Tx            from './Tx.vue'
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
