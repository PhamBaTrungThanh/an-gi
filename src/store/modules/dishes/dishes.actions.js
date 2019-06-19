import isNil from 'lodash/isNil'
import { SEARCH_FOR_DISHES_BY_QUERY, VIEW_SINGLE_DISH } from '@/API/dish'

const checkSystemReady = (rootState, commit, actionName) => {
  try {
    const currentPositionLatitude = rootState.map.currentPositionCoordinates.lat
    if (isNil(currentPositionLatitude)) {
      commit('authentication/pushToPipeline', actionName, {
        root: true
      })
      throw 'No current position detected, registering self to map pipeline'
    }
    if (isNil(rootState.authentication.credentials.accessToken)) {
      commit('authentication/pushToPipeline', actionName, {
        root: true
      })
      throw 'No authentication detected, registering self to map pipeline'
    }
  } catch (e) {
    return e
  }
}
export default {
  async queryDishes({ commit, rootState, state }) {
    try {
      commit('setQueryingTrue')
      commit('setDishQuery', rootState.route.params.query)

      checkSystemReady(rootState, commit, 'dishes/queryDishes')
      const currentPosition = rootState.map.currentPositionCoordinates
      const response = await SEARCH_FOR_DISHES_BY_QUERY({
        query: state.currentQuery,
        lat: currentPosition.lat,
        lng: currentPosition.lng
      })
      commit('resetDishPool')
      if (response.data.length > 0) {
        commit('addToDishPool', response.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('setQueryingFalse')
    }
  },
  async querySingleDish({ commit, rootState, state, getters }) {
    try {
      commit('setQueryingTrue')

      commit('setCurrentDishId', parseInt(rootState.route.params.id))

      if (getters.currentDish === false) {
        console.warn('No dish found with index')
        checkSystemReady(rootState, commit, 'dishes/querySingleDish')
        const currentPosition = rootState.map.currentPositionCoordinates
        const response = await VIEW_SINGLE_DISH({
          id: state.currentDishId,
          lat: currentPosition.lat,
          lng: currentPosition.lng
        })
        if (isNil(response)) {
          throw 'AJAX request canceled'
        }
        commit('addToDishPool', [response.data])
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('setQueryingFalse')
    }
  }
}
