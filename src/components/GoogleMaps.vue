<template>
  <div ref="googleMap" class="google-maps w-screen h-screen"></div>
</template>
<script>
import GoogleMapsInit from '@/misc/google-maps-init'
import { mapGetters, mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import { getCurrentGeolocation } from '@/misc/helpers'
import isNil from 'lodash/isNil'

const PINS_SPIN_TIME = 20

export default {
  name: 'GoogleMaps',
  data() {
    return {
      googleMapApi: null,
      map: null,
      pinsOnMap: [],
      currentPositionPin: null,
      currentLocation: null
    }
  },
  computed: {
    ...mapGetters('map', ['defaultMapStyle']),
    ...mapState('dishes', ['dishesSuggestions']),
    ...mapState('map', ['currentPositionCoordinates'])
  },
  watch: {
    // pins: function(newPins, oldPins) {
    //   // make a clone of old pins
    //   const pinsToRemove = this.pins
    //   // loop through new pins
    //   const pinsToAdd = []
    //   for (const newPin of newPins) {
    //     // if the old pin pool is gone, skip the check
    //     if (pinsToRemove.length > 0) {
    //       const index = pinsToRemove.findIndex(pin => pin.dish_id === newPin.id)
    //       if (index === -1) {
    //         // this pins is new
    //         pinsToAdd.push(newPin)
    //         continue
    //       }
    //       // else, this pin is already on the map, remove from old pin pool
    //       pinsToRemove.splice(index, 1)
    //     }
    //   }
    //   this.removePins(pinsToRemove)
    //   const markers = []
    //   for (const pin of pinsToAdd) {
    //     // make new custom pin
    //     const marker = new this.googleMapApi.maps.Marker({
    //       position: new this.googleMapApi.maps.LatLng(
    //         pin._geoloc.lat,
    //         pin._geoloc.lng
    //       ),
    //       title: pin.name,
    //       label: pin.name,
    //       map: this.map,
    //       icon: {
    //         url: `https://angi.phambatrungthanh.com/storage/${pin.image}`,
    //         scaledSize: new this.googleMapApi.maps.Size(32, 32)
    //       },
    //       dish_id: pin.id
    //     })
    //     markers.push(marker)
    //   }
    //   this.addPins(markers)
    //   this.pinsOnMap = markers
    // }
    currentPositionCoordinates: function() {
      if (!isNil(this.map)) {
        this.map.setCenter({
          lat: this.currentPositionCoordinates.lat,
          lng: this.currentPositionCoordinates.lng
        })
        this.drawCurrentPositionPin()
      }
    }
  },
  async mounted() {
    try {
      const [google, geolocationObject] = await Promise.all([
        GoogleMapsInit(),
        getCurrentGeolocation()
      ])
      this.googleMapApi = google
      this.checkCurrentPositionStatus(geolocationObject)
    } catch (error) {
      console.error(error)
    }
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      this.map = new this.googleMapApi.maps.Map(this.$refs.googleMap, {
        zoom: 17,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        styles: this.defaultMapStyle,
        maxZoom: 18
      })
      this.map.addListener(
        'bounds_changed',
        debounce(() => {
          const centerPoint = this.map.getCenter()
          if (!isNil(centerPoint)) {
            const coordinates = {
              lat: centerPoint.lat(),
              lng: centerPoint.lng(),
              zoom: this.map.getZoom()
            }
            this.setCurrentMapCoordinates(coordinates)
            this.setBoundingBoxCoordiantes(this.map.getBounds())
          }
        }, 400)
      )
    },
    removePins(pinsToRemove = []) {
      // remove old pins
      // let index = 0
      // for (const pin of pinsToRemove) {
      //   setTimeout(function() {
      //     pin.setMap(null)
      //   }, index * PINS_SPIN_TIME)
      //   index++
      // }
    },
    addPins(pinsToAdd) {
      // add new
      // let index = 0
      // for (const pin of pinsToAdd) {
      //   setTimeout(function() {
      //     pin.setMap(this.map)
      //   }, index * PINS_SPIN_TIME)
      //   index++
      // }
    },
    drawCurrentPositionPin() {
      if (isNil(this.currentPositionPin)) {
        this.currentPositionPin = new this.googleMapApi.maps.Marker({
          position: {
            lat: this.currentPositionCoordinates.lat,
            lng: this.currentPositionCoordinates.lng
          },
          map: this.map
        })
      } else {
        this.currentPositionPin.setPosition({
          lat: this.currentPositionCoordinates.lat,
          lng: this.currentPositionCoordinates.lng
        })
      }
    },
    checkCurrentPositionStatus(geolocation) {
      if (geolocation.status === 'success') {
        const position = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
          status: 'machine_geolocation'
        }
        this.setCurrentPositionCoordinates(position)
      } else if (geolocation.status === 'geolocation_not_available') {
        this.setCurrentPositionCoordinates({
          lat: null,
          lng: null,
          status: 'geolocation_not_available'
        })
      }
    },
    ...mapActions('map', [
      'setCurrentMapCoordinates',
      'setBoundingBoxCoordiantes',
      'setCurrentPositionCoordinates'
    ])
  }
}
</script>
