import algoliasearch from 'algoliasearch'

export default class searchAPI {
  constructor() {
    const client = algoliasearch(
      process.env.VUE_APP_ALGOLIA_ID,
      process.env.VUE_APP_ALGOILA_SECRET
    )
    this.api = client.initIndex('dishes')
  }
  async SEARCH_INSIDE_BOUNDING_BOX({
    point1_lat,
    point1_lng,
    point2_lat,
    point2_lng
  }) {
    const boundingBox = [point1_lat, point1_lng, point2_lat, point2_lng]
    try {
      const content = await this.api.search({
        query: '',
        insideBoundingBox: [boundingBox]
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('List of pins to display on the map', content)
      }
      return content
    } catch (e) {
      console.log(e)
      if (process.env.NODE_ENV === 'development') {
        console.log(e.debugData)
      }
    }
  }
  async SEARCH_AROUND_CENTER_POINT({ lat, lng }) {
    try {
      const content = await this.api.search({
        query: '',
        aroundLatLng: [lat, lng].join(', '),
        hitsPerPage: 20
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('List of pins to display on the map', content)
      }
      return content
    } catch (e) {
      console.log(e)
      if (process.env.NODE_ENV === 'development') {
        console.log(e.debugData)
      }
    }
  }
}
