export default {
  setCurrentMapCoordinates: ({ commit }, { lat, lng, zoom }) => {
    commit('setCenterPointCoordinates', {
      lat,
      lng
    })
    commit('setMapZoomLevel', zoom)
  },

  setCurrentPositionCoordinates({ commit }, position) {
    commit('setCurrentPositionCoordinates', position)
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
  }
}
