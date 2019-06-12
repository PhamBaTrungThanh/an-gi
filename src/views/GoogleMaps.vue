<template>
  <div ref="googleMap" class="google-maps w-screen h-screen"></div>
</template>
<script>
import GoogleMapsInit from '@/misc/google-maps-init'
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'GoogleMaps',
  props: {
    latitude: Number,
    longitude: Number
  },
  data() {
    return {
      googleMapApi: null,
      map: null
    }
  },
  computed: {
    ...mapGetters('map', ['defaultMapStyle'])
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
        }, 200)
      )
    },
    ...mapActions('map', [
      'setCurrentMapCoordinates',
      'setBoundingBoxCoordiantes'
    ])
  }
}
</script>
