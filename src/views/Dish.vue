/* eslint-disable vue/order-in-components */
<template></template>

<script>
import Loader from '@/components/Loader'
import { SEARCH_FOR_DISHES_BY_QUERY } from '@/API/dish'
import { mapState } from 'vuex'

export default {
  name: 'Search',
  components: {
    Loader
  },
  data() {
    return {
      dishes: [],
      loading: false,
      error: false,
      queryString: ''
    }
  },
  computed: {
    ...mapState('map', ['currentPositionCoordinates'])
  },
  watch: {
    $route: 'fetchDishesByQuery'
  },
  created() {
    this.fetchDishesByQuery()
  },

  methods: {
    fetchDishesByQuery() {
      this.loading = true
      this.dishes = []
      this.error = false
      this.queryString = this.$route.params.query
      ;(async () => {
        try {
          const response = await SEARCH_FOR_DISHES_BY_QUERY({
            query: this.$route.params.query,
            lat: this.currentPositionCoordinates.lat,
            lng: this.currentPositionCoordinates.lng
          })
          this.dishes = response.data
          this.loading = false
        } catch (e) {
          console.log(e)
        }
      })()
    },
    search() {
      this.$router.push({
        name: 'search',
        params: {
          query: this.queryString
        }
      })
    }
  }
}
</script>
