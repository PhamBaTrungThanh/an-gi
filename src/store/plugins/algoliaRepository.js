import algoliasearch from 'algoliasearch'

export default function algoliaRespository() {
  const client = algoliasearch(
    process.env.VUE_APP_ALGOLIA_ID,
    process.env.VUE_APP_ALGOILA_SECRET
  )
  const index = client.initIndex('dishes')
  const queryDishesBaseOnMapBoudingBox = coords => {
    console.log(coords)
  }
  return store => {
    store.subscribe(mutation => {
      // register event
      if (mutation.type === 'map/setMapBoundingBoxCoordinates') {
        queryDishesBaseOnMapBoudingBox(mutation.payload)
      }
    })
  }
}
