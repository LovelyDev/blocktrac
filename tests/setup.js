import { createLocalVue } from "@vue/test-utils"
import Vuex from 'vuex'
import Multiselect from 'vue-multiselect'
import NetworkConnection from '../src/network-connection'

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.component('multiselect', Multiselect)
localVue.use(NetworkConnection)

import { store } from '../src/store'

export default {
  localVue,
  store
}
