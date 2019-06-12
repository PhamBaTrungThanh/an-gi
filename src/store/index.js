import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import algoliaRepository from './plugins/algoliaRepository'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [algoliaRepository()],
  modules: modules
})
