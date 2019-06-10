<template>
  <div>
    <google-maps></google-maps>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GoogleMaps from './GoogleMaps'

export default {
  components: {
    GoogleMaps
  },
  data() {
    return {
      latitude: 0,
      longitude: 0
    }
  },
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'Bento-starter home page',
        id: 'desc'
      }
    ]
  },
  computed: mapState('app', ['appTitle']),
  mounted() {
    this.setDefaultCoordinates()
  },

  methods: {
    ...mapActions('map', ['setDefaultCoordinates'])
  }
}
</script>
