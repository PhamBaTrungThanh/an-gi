import isNil from 'lodash/isNil'
import {
  SEARCH_FOR_DISHES_BY_QUERY
} from '@/API/dish'
import dishPlugin from '@/store/plugins/dishPlugin';

export default {
  async queryDishes({
    commit,
    rootState,
    state
  }, query = false) {
    try {
      commit('setQueryingTrue')
      if (query !== false) {
        if (state.currentQuery === false) {
          commit('setDishQuery', query)
        } else {
          throw 'No query specified, arborting'
        }
      }

      const currentPosition = rootState.map.currentPositionCoordinates
      if (isNil(currentPosition.lat)) {
        throw 'No current position detected, arborting'
      }

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
  async querySingleDish({
    commit,
    rootState,
    state
  }, dishId = false) {
    try {
      commit('setQueryingTrue')
      const currentPosition = rootState.map.currentPositionCoordinates
      if (isNil(currentPosition.lat)) {
        throw 'No current position detected, arborting'
      }
      if (dishId !== false) {
        if (state.currentDishId === false)
      }
      if (state.dishPool.length > 0) {
        // find in the pool first
        const dishIndex = state.dishPool.findIndex(d => d.id === dishId)
        if (dishIndex !== -1) {
          const dish = state.dishPool[dishIndex]

        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('setQueryingFalse')
    }
  }
}