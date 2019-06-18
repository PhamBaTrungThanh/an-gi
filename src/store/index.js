import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import mapPlugin from './plugins/mapPlugin'
import dishPlugin from './plugins/dishPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [mapPlugin(), dishPlugin()],
  modules: modules
})
