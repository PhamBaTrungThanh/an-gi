export default {
  /* Product input name */

  setCurrentLatitude: (state, latitude) => {
    state.latitude = latitude
  },
  setCurrentLongitude: (state, longitude) => {
    state.longitude = longitude
  },
  setCurrentZoomLevel: (state, zoom) => {
    state.zoomLevel = zoom
  }
}
