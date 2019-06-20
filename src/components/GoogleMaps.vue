<template>
  <div class="w-screen h-screen">
    <div
      ref="googleMap"
      :class="{
        'w-full': true,
        'h-full': true,
        hidden: shouldHideGoogleMap
      }"
    ></div>
    <div v-if="shouldHideGoogleMap" class="google-maps-static">
      <img :src="googleMapsStaticImage" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'

import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import createHTMLMapMarker from '@/misc/custom-overlays-for-map'

// const PINS_SPIN_TIME = 20

export default {
  name: 'GoogleMaps',
  data() {
    return {
      map: null,
      currentPositionPin: null,
      currentLocation: null,
      directionsService: null,
      directionsDisplay: null,
      originLatLng: null,
      destinationPin: null
    }
  },
  computed: {
    shouldHideGoogleMap() {
      return false
    },
    googleMapsStaticImage() {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${
        this.currentPositionCoordinates.lat
      },${this.currentPositionCoordinates.lng}&zoom=13&language=VN&size=${
        window.innerWidth
      }x${window.innerHeight}&maptype=roadmap
&markers=color:blue%7C${this.currentPositionCoordinates.lat},${
        this.currentPositionCoordinates.lng
      }
&key=AIzaSyCtubooeixMRXbKyQf9VOSWzQF-2CQuDYU`
    },
    ...mapGetters('map', ['defaultMapStyle']),
    ...mapState('dishes', ['dishesSuggestions']),
    ...mapState('map', ['currentPositionCoordinates', 'destinationPoint'])
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
    //     const marker = new window.google.maps.Marker({
    //       position: new window.google.maps.LatLng(
    //         pin._geoloc.lat,
    //         pin._geoloc.lng
    //       ),
    //       title: pin.name,
    //       label: pin.name,
    //       map: this.map,
    //       icon: {
    //         url: `https://angi.phambatrungthanh.com/storage/${pin.image}`,
    //         scaledSize: new window.google.maps.Size(32, 32)
    //       },
    //       dish_id: pin.id
    //     })
    //     markers.push(marker)
    //   }
    //   this.addPins(markers)
    //   this.pinsOnMap = markers
    // }
    destinationPoint: 'toggleDestination',
    currentPositionCoordinates: 'setMapCenter'
  },
  mounted() {
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      console.log('initialize map')
      this.map = new window.google.maps.Map(this.$refs.googleMap, {
        zoom: 17,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        styles: this.defaultMapStyle,
        maxZoom: 18,
        restriction: {
          latLngBounds: {
            east: 105.90403613418505,
            west: 105.74517768799512,
            north: 21.086596549526824,
            south: 20.940312549774596
          },
          strictBounds: true
        },
        center: {
          lat: this.currentPositionCoordinates.lat,
          lng: this.currentPositionCoordinates.lng
        }
      })

      this.directionsService = new window.google.maps.DirectionsService()
      this.directionsDisplay = new window.google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(this.map)
      this.directionsDisplay.setOptions({
        suppressMarkers: true
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
      this.drawCurrentPositionPin()
    },
    // removePins(pinsToRemove = []) {
    //   remove old pins
    //   let index = 0
    //   for (const pin of pinsToRemove) {
    //     setTimeout(function() {
    //       pin.setMap(null)
    //     }, index * PINS_SPIN_TIME)
    //     index++
    //   }
    // },
    // addPins(pinsToAdd) {
    //   add new
    //   let index = 0
    //   for (const pin of pinsToAdd) {
    //     setTimeout(function() {
    //       pin.setMap(this.map)
    //     }, index * PINS_SPIN_TIME)
    //     index++
    //   }
    // },
    drawCurrentPositionPin() {
      this.originLatLng = new window.google.maps.LatLng(
        this.currentPositionCoordinates.lat,
        this.currentPositionCoordinates.lng
      )
      if (!isEmpty(this.currentPositionPin)) {
        this.currentPositionPin.setMap(null)
      }
      this.currentPositionPin = createHTMLMapMarker({
        latlng: this.originLatLng,
        map: this.map,
        html: `<div class="current_position_pin"></div>`
      })
    },

    toggleDestination() {
      if (isEmpty(this.destinationPoint)) {
        this.clearDestination()
        this.clearDirection()
      } else {
        const destinationLatLng = new window.google.maps.LatLng(
          this.destinationPoint.lat,
          this.destinationPoint.lng
        )
        this.clearDestination()
        this.createDestination(destinationLatLng)
        this.createDirection(destinationLatLng)
      }
    },
    createDestination(destinationLatLng) {
      this.destinationPin = createHTMLMapMarker({
        latlng: destinationLatLng,
        map: this.map,
        html: `<div class="destination_pin"><img src="${
          this.destinationPoint.image
        }"></div>`
      })
    },
    clearDestination() {
      if (!isEmpty(this.destinationPin)) {
        this.destinationPin.setMap(null)
      }
    },
    createDirection(destinationLatLng) {
      this.directionsService.route(
        {
          origin: this.originLatLng,
          destination: destinationLatLng,
          travelMode: 'WALKING',
          provideRouteAlternatives: true
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response)
          } else {
            console.error('Directions request failed due to ' + status)
          }
        }
      )
    },
    clearDirection() {},
    ...mapActions('map', [
      'setCurrentMapCoordinates',
      'setBoundingBoxCoordiantes',
      'setCurrentPositionCoordinates'
    ])
  }
}
</script>
