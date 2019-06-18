export default {
  /* Product input name */

  setCenterPointCoordinates: (state, coords) => {
    state.centerCoordiates = coords
  },
  setMapZoomLevel: (state, zoom) => {
    state.zoomLevel = zoom
  },
  setMapBoundingBoxCoordinates: (state, coords) => {
    state.mapBoundingBox = coords
  },
  setCurrentPositionCoordinates: (state, position) => {
    state.currentPositionCoordinates = position
  }
}
