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
  },
  clearMapPipeline: state => (state.mapPipeline = []),
  pushToMapPipeline: (state, action) => state.mapPipeline.push(action),
  clearDestinationPoint: state => (state.destinationPoint = {}),
  setDestinationPoint: (state, point) => (state.destinationPoint = point),
  setGoogleMapReady: state => (state.googleMapStatus = 'ready')
}
