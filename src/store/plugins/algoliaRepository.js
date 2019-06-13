import searchAPI from '@/respositories/algolia'

export default function algoliaRespository() {
  const api = new searchAPI()

  return store => {
    const queryDishesBaseOnMapCenter = async coords => {
      try {
        const dishPins = await api.SEARCH_AROUND_CENTER_POINT(coords)
        store.dispatch('dishes/setPinsOnMap', dishPins.hits)
      } catch (e) {
        console.log(e)
      }
    }
    store.subscribe(mutation => {
      // register event
      if (mutation.type === 'map/setCenterPointCoordinates') {
        queryDishesBaseOnMapCenter(mutation.payload)
      }
    })
  }
}
