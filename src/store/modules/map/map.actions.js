export default {
  setCurrentMapCoordinates: ({ commit }, { lat, lng, zoom }) => {
    commit('setCenterPointCoordinates', {
      lat,
      lng
    })
    commit('setMapZoomLevel', zoom)
  },
  setDefaultCoordinates: ({ commit }) => {
    const geoError = error => {
      console.error(error)
    }
    const geoSuccess = position => {
      const coors = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      commit('setCenterPointCoordinates', coors)
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
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
