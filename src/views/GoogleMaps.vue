<template>
  <div ref="googleMap" class="google-maps w-screen h-screen"></div>
</template>
<script>
import GoogleMapsInit from '@/misc/google-maps-init'
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { makeRe } from 'minimatch'

const PINS_SPIN_TIME = 20
export default {
  name: 'GoogleMaps',
  props: {
    latitude: Number,
    longitude: Number
  },
  data() {
    return {
      googleMapApi: null,
      map: null,
      pinsOnMap: []
    }
  },
  computed: {
    ...mapGetters('map', ['defaultMapStyle']),
    ...mapGetters('dishes', ['pins'])
  },
  watch: {
    pins: function(newPins, oldPins) {
      // make a clone of old pins
      const pinsToRemove = this.pins

      // loop through new pins
      const pinsToAdd = []
      for (const newPin of newPins) {
        // if the old pin pool is gone, skip the check
        if (pinsToRemove.length > 0) {
          const index = pinsToRemove.findIndex(pin => pin.dish_id === newPin.id)
          if (index === -1) {
            // this pins is new
            pinsToAdd.push(newPin)
            continue
          }
          // else, this pin is already on the map, remove from old pin pool
          pinsToRemove.splice(index, 1)
        }
      }

      this.removePins(pinsToRemove)
      const markers = []
      for (const pin of pinsToAdd) {
        // make new custom pin
        const marker = new this.googleMapApi.maps.Marker({
          position: new this.googleMapApi.maps.LatLng(
            pin._geoloc.lat,
            pin._geoloc.lng
          ),
          title: pin.name,
          label: pin.name,
          map: this.map,
          icon: {
            url: `https://angi.phambatrungthanh.com/storage/${pin.image}`,
            scaledSize: new this.googleMapApi.maps.Size(32, 32)
          },
          dish_id: pin.id
        })
        markers.push(marker)
      }
      this.addPins(markers)
      this.pinsOnMap = markers
    }
  },
  async mounted() {
    try {
      const google = await GoogleMapsInit()
      this.googleMapApi = google
    } catch (error) {
      console.error(error)
    }
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      this.map = new this.googleMapApi.maps.Map(this.$refs.googleMap, {
        center: { lat: 20.9969152, lng: 105.84064 },
        zoom: 17,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        styles: this.defaultMapStyle
      })
      this.map.addListener(
        'bounds_changed',
        debounce(() => {
          const centerPoint = this.map.getCenter()
          const coordinates = {
            lat: centerPoint.lat(),
            lng: centerPoint.lng(),
            zoom: this.map.getZoom()
          }
          this.setCurrentMapCoordinates(coordinates)
          this.setBoundingBoxCoordiantes(this.map.getBounds())
        }, 400)
      )
    },
    removePins(pinsToRemove = []) {
      // remove old pins
      let index = 0
      for (const pin of pinsToRemove) {
        setTimeout(function() {
          pin.setMap(null)
        }, index * PINS_SPIN_TIME)
        index++
      }
    },
    addPins(pinsToAdd) {
      // add new
      let index = 0
      for (const pin of pinsToAdd) {
        setTimeout(function() {
          pin.setMap(this.map)
        }, index * PINS_SPIN_TIME)
        index++
      }
    },
    ...mapActions('map', [
      'setCurrentMapCoordinates',
      'setBoundingBoxCoordiantes'
    ])
  }
}
</script>
