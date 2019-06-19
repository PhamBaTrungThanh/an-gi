export default {
  setCurrentMapCoordinates: ({ commit }, { lat, lng, zoom }) => {
    commit('setCenterPointCoordinates', {
      lat,
      lng
    })
    commit('setMapZoomLevel', zoom)
  },

  setCurrentPositionCoordinates({ commit, state, dispatch }, position) {
    commit('setCurrentPositionCoordinates', position)

    if (state.mapPipeline.length > 0) {
      for (const pipeline of state.mapPipeline) {
        dispatch(pipeline, null, {
          root: true
        })
      }
      commit('clearMapPipeline')
    }
  },
  setBoundingBoxCoordiantes: ({ commit }, bounds) => {
    const topLeft = bounds.getSouthWest()
    const bottomRight = bounds.getNorthEast()
    commit('setMapBoundingBoxCoordinates', {
      point1_lat: topLeft.lat(),
      point1_lng: topLeft.lng(),
      point2_lat: bottomRight.lat(),
      point2_lng: bottomRight.lng()
    })
  },
  setGoogleMapState({ commit }) {
    commit('setGoogleMapReady')
  },
  setDestination({ commit }, destinationPoint) {
    commit('setDestinationPoint', destinationPoint)
  },
  clearDestination({ commit }) {
    commit('clearDestinationPoint')
  }
}
