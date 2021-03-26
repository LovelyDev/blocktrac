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

import("../public/common.css")
import("../public/fonts.css")
require("./filters")

Vue.config.productionTip = false

///

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

// Vue HTTP Client
import VueResource   from 'vue-resource'
Vue.use(VueResource)

///

// Connection to the blockchain server
import NetworkConnection from './plugins/network-connection'
Vue.use(NetworkConnection)

///

// Global document configuration
import DocVars from './plugins/doc-vars.js';
Vue.use(DocVars)

///

import { router } from './router'
import { store }  from './store'

new Vue({
  router : router,
  store  : store
}).$mount('#app')
