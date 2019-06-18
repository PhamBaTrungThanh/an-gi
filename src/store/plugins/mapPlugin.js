import { GET_SUGGESTIONS_AROUND_CENTER_POINT } from '@/API/map'

export default function mapPlugin() {
  return store => {
    const queryDishesBaseOnMapCenter = async coords => {
      try {
        const dishPins = await GET_SUGGESTIONS_AROUND_CENTER_POINT(coords)
        //store.dispatch('dishes/setPinsOnMap', dishPins.hits)
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
