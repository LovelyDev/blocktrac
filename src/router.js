import Vue  from 'vue'

///

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

///

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
  mode : "history",
  routes : routes,

  // always scroll to top on nav
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
