<template>
    <div class="container mx-auto">
        <div class="my-8">
            <h1 class="text-large font-bold">Tọa độ của bạn</h1>
            <p class="mt-4">Latitude: {{ latitude }}</p>
            <p class="mt-4">Longitude: {{ longitude }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
        this.getGeolocation()
    },
    methods: {
        getGeolocation() {
            navigator.geolocation.getCurrentPosition(
                this.geoSuccess,
                this.geoError
            )
        },
        geoError(error) {
            console.error(error)
        },
        geoSuccess(position) {
            console.log(position)
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
        }
    }
}
</script>
