<template>
  <div id="app">
    <!-- <nav-bar></nav-bar> -->
    <location></location>
    <template v-if="locationReady">
      <div class="main-wrapper">
        <router-view />
      </div>
      <google-maps></google-maps>
    </template>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    ></apple-add-to-home-screen-modal>
  </div>
</template>
<script>
// import NavBar from '@/components/NavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import GoogleMaps from '@/components/GoogleMaps'
import Location from '@/components/Location'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    // NavBar,
    NewContentAvailableToastr,
    AppleAddToHomeScreenModal,
    GoogleMaps,
    Location
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', [
      'showAddToHomeScreenModalForApple',
      'refreshingApp',
      'locationReady'
    ])
  },
  methods: mapActions('app', [
    'closeAddToHomeScreenModalForApple',
    'serviceWorkerSkipWaiting'
  ])
}
</script>
