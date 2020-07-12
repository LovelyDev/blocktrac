import { createLocalVue } from "@vue/test-utils"
import Vuex from 'vuex'
import Multiselect from 'vue-multiselect'

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.component('multiselect', Multiselect)

import { store } from '../src/store'

export default {
  localVue,
  store
}
