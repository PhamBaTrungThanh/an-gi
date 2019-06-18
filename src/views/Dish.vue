/* eslint-disable vue/order-in-components */
<template>
  <div>
    <div class="fixed inset-0 bg-black opacity-50 z-10 hidden lg:block"></div>
    <div
      class="fixed bottom-0 left-0 right-0 h-full pt-20 px-2 z-20 lg:pt-0 lg:px-0 lg:flex justify-center items-center"
    >
      <div
        class="bg-white w-full h-full rounded-t shadow lg:w-2/5 lg:mx-auto lg:rounded lg:h-auto lg:shadow-md"
      >
        <template v-if="loading === true">
          <div class="py-20">
            <loader></loader>
          </div>
        </template>
        <template v-else-if="isAvailable(dish)">
          <div class="dish__view lg:flex">
            <div class="dish__view__left lg:w-1/2">
              <img
                :src="dish.image"
                :alt="dish.name"
                class="w-full h-auto rounded-tl rounded-tr lg:rounded-bl lg:rounded-tr-none object-fit"
              />
            </div>

            <div class="dish__view__right lg:w-1/2">
              <div class="dish__view__right__content px-2 pt-2 lg:px-6 lg:py-6">
                <h1 class="font-bold text-2xl">{{ dish.name }}</h1>
                <h3 class="text-gray-800 mt-4">{{ dish.location }}</h3>
                <p class="text-gray-600 text-md mt-1">
                  {{ dish.geodistance.toFixed(1) }} km
                </p>
              </div>
              <div class="dish__view__right__controls mt-4 flex px-2 lg:px-6">
                <a
                  class="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 rounded text-center"
                  >Chỉ đường cho tôi</a
                >
              </div>
              <div class="separator w-full h-px bg-gray-200 my-4"></div>
              <div class="dish__view__right__comments mt-4 px-2 lg:px-6">
                <p>
                  <b>Bình luận</b>
                </p>
                <p class="py-2 text-center">Chưa có bình luận nào</p>
              </div>
            </div>
            <!-- <div
            class="dish__view__comment_box fixed left-0 right-0 bottom-0 h-10 px-2"
          >
            <div class="dish__view__comment_box__write">
              <input placeholder="Viết bình luận" class="px-4" />
            </div>
            </div>-->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import { VIEW_DISH } from '@/API/dish'
import { mapState } from 'vuex'
import isNil from 'lodash/isNil'

export default {
  name: 'Dish',
  components: {
    Loader
  },
  data() {
    return {
      loading: false,
      error: false
    }
  },
  computed: {
    ...mapState('map', ['currentPositionCoordinates'])
  },
  asyncComputed: {
    dish: async function() {
      if (isNil(this.currentPositionCoordinates.lat)) {
        return false
      }
      try {
        this.loading = true
        this.error = false
        const response = await VIEW_DISH({
          id: this.$attrs.id,
          lat: this.currentPositionCoordinates.lat,
          lng: this.currentPositionCoordinates.lng
        })
        this.loading = false
        return response.data
      } catch (e) {
        console.log(e)
        this.error = true
      }
    }
  },
  methods: {
    isAvailable(variable) {
      return !isNil(variable) && variable !== false
    }
  }
}
</script>
