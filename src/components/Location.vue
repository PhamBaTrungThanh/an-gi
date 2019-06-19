<template>
  <div>
    <div
      v-if="currentPositionStatus === 'enabled'"
      class="location fixed left-0 right-0 top-0 h-12 p-2"
    >
      <div
        class="bg-white h-10 shadow border border-gray-200 border-solid flex lg:w-2/5"
      >
        <img src="@/assets/img/ui/location.png" class="w-16 h-16" />
        <div class="ml-18 px-1 pt-2 flex-1">
          <input
            id="searchBox"
            ref="searchBox"
            v-model="address"
            type="text"
            class="outline-none w-full"
            placeholder="Bạn đang ở đâu đấy?"
            @focus="$event.target.select()"
          />
        </div>
      </div>
    </div>
    <div
      v-if="currentPositionStatus === 'notavaiable'"
      class="fixed inset-0 flex justify-center items-center"
    >
      <div class="px-4 mb-16 flex items-center flex-col">
        <img src="@/assets/img/ui/location.png" class="w-16 h-16" />

        <input
          id="searchBox"
          ref="searchBox"
          v-model="address"
          type="text"
          class="outline-none w-full px-1 pt-2 flex-1 text-4xl text-center"
          placeholder="Bạn đang ở đâu đấy?"
          @focus="$event.target.select()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getCurrentGeolocation } from '@/misc/helpers'

export default {
  name: 'Location',
  data() {
    return {
      address: '',
      currentPositionGeolocation: {},
      currentPositionStatus: 'inactive'
    }
  },
  computed: {
    ...mapState('map', [
      'currentPositionCoordinates',
      'currentPositionAddress',
      'googleMapStatus'
    ])
  },
  watch: {
    //currentPositionCoordinates: 'initializeGoogleMapsServices'
  },
  async mounted() {
    try {
      //this.initalizeSearchBox()
      const geolocationObject = await getCurrentGeolocation()
      this.checkCurrentPositionStatus(geolocationObject)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    checkCurrentPositionStatus(geolocation) {
      if (geolocation.status === 'success') {
        const position = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
          status: 'machine_geolocation'
        }

        this.setCurrentPositionCoordinates(position)
        this.currentPositionStatus = 'enabled'
        this.locationIsReady()
      } else if (geolocation.status === 'geolocation_not_available') {
        // this.setCurrentPositionCoordinates({
        //   lat: null,
        //   lng: null,
        //   status: 'geolocation_not_available'
        // })
        this.currentPositionStatus = 'notavaiable'
        this.initalizeSearchBox()
      }
    },

    getCurrentPositionAddress() {
      const geoCoder = new window.google.maps.Geocoder()
      const latLng = {
        lat: this.currentPositionCoordinates.lat,
        lng: this.currentPositionCoordinates.lng
      }
      geoCoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
          if (results.length > 0) {
            this.address = this.formatAddress(results[0].formatted_address)
          }
        }
      })
    },
    formatAddress(address) {
      return address.replace(', Hà Nội, Vietnam', '')
    },
    initalizeSearchBox() {
      const searchBox = new window.google.maps.places.SearchBox(
        document.getElementById('searchBox')
      )

      searchBox.setBounds({
        east: 105.90403613418505,
        west: 105.74517768799512,
        north: 21.086596549526824,
        south: 20.940312549774596
      })
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()

        if (places.length === 0) {
          return
        }
        const selectedPlace = places[0]
        if (!selectedPlace.geometry) {
          console.log('Returned place contains no geometry')
          return
        }
        const position = {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
          status: 'user_selected'
        }
        //this.setCurrentPositionCoordinates(position)
      })
    },
    ...mapActions('map', ['setCurrentPositionCoordinates']),
    ...mapActions('app', ['locationIsReady'])
  }
}
</script>
