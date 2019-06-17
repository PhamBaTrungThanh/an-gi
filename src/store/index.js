import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import mapPlugin from './plugins/mapPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [mapPlugin()],
  modules: modules
})
