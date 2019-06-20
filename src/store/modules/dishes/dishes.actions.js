import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import { SEARCH_FOR_DISHES_BY_QUERY, VIEW_SINGLE_DISH } from '@/API/dish'

const awaitSystemReady = async (rootState, commit, actionName) => {
  console.log({
    actionName
  })
  try {
    const currentPositionCoordinates = rootState.map.currentPositionCoordinates
    if (isEmpty(currentPositionCoordinates)) {
      commit('map/pushToMapPipeline', actionName, {
        root: true
      })
      throw 'No current position detected, registering self to map pipeline :: from ' +
        actionName
    }
    if (isNil(rootState.authentication.credentials.accessToken)) {
      commit('authentication/pushToPipeline', actionName, {
        root: true
      })
      throw 'No authentication detected, registering self to authentication pipeline :: from ' +
        actionName
    }
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}
export default {
  async queryDishes({ commit, rootState, state }) {
    try {
      commit('setQueryingTrue')
      commit('setDishQuery', rootState.route.params.query)

      const awaitee = await awaitSystemReady(
        rootState,
        commit,
        'dishes/queryDishes'
      )
      if (awaitee) {
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
        const awaitee = await awaitSystemReady(
          rootState,
          commit,
          'dishes/querySingleDish'
        )
        if (awaitee) {
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
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('setQueryingFalse')
    }
  }
}
