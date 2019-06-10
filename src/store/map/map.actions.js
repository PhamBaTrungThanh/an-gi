export default {
  setCurrentMapCoordinates: ({ commit }, coordiates) => {
    commit('setCurrentLatitude', coordiates.lat)
    commit('setCurrentLongitude', coordiates.lng)
    commit('setCurrentZoomLevel', coordiates.zoom)
  },
  setDefaultCoordinates: ({ commit }) => {
    const geoError = error => {
      console.error(error)
    }
    const geoSuccess = position => {
      commit('setCurrentLatitude', position.coords.latitude)
      commit('setCurrentLongitude', position.coords.longitude)
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  }
}
