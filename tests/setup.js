import { createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue();

///

import Vuex from 'vuex'
localVue.use(Vuex)

///

import Multiselect from 'vue-multiselect'
localVue.component('multiselect', Multiselect)

///

import NetworkConnection from '../src/plugins/network-connection'
localVue.use(NetworkConnection)

///

import VueReactiveCookie from 'vue-reactive-cookie'
localVue.use(VueReactiveCookie, {convertJSON : true})

///

import BootstrapVue from 'bootstrap-vue'

localVue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///

import VueRouter from 'vue-router'
localVue.use(VueRouter)

///

import { router } from '../src/router'
import { store  } from '../src/store'

export default {
  localVue,
  store,
  router
}
