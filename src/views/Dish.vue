/* eslint-disable vue/order-in-components */
<template>
  <div>
    <template v-if="isDirecting === true">
      <div
        class="fixed bottom-0 left-0 right-0 h-24 z-20 mx-auto dish__direction__panel"
      >
        <div
          class="relative p-2 w-full h-full dish__direction__panel__container"
        >
          <div
            class="dish__direction__panel__content h-full bg-white shadow-md rounded lg:w-2/5 mx-auto"
          >
            <template v-if="isQuerying === true">
              <div class="pt-6">
                <loader></loader>
              </div>
            </template>
            <template v-else>
              <div
                class="dish__direction__view flex cursor-pointer"
                @click="stopDirecting"
              >
                <img
                  :src="currentDish.image"
                  :alt="currentDish.name"
                  class="h-20 w-20 rounded-l object-fit"
                />
                <div class="mt-1 ml-2 relative flex-1">
                  <p class="font-bold">{{ currentDish.name }}</p>
                  <p class="text-gray-800">{{ currentDish.location }}</p>
                  <small
                    class="text-xs text-gray-500 absolute bottom-0 right-0 pr-1 pb-1"
                  >
                    ~{{ (currentDish.geodistance / 1000).toFixed(1) }}
                    km
                  </small>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="fixed inset-0 bg-black opacity-50 z-10 hidden lg:block"></div>
      <div
        class="fixed bottom-0 left-0 right-0 h-full overflow-y-auto pt-20 px-2 z-20 lg:pt-0 lg:px-0 lg:flex justify-center items-center"
      >
        <div
          class="bg-white w-full min-h-full rounded-t shadow lg:w-3/5 lg:mx-auto lg:rounded lg:h-auto lg:shadow-md lg:min-h-0"
        >
          <template v-if="isQuerying === true">
            <div class="py-20">
              <loader></loader>
            </div>
          </template>
          <template v-else-if="currentDish !== false">
            <div class="dish__view lg:flex">
              <div class="dish__view__left relative lg:w-1/2">
                <div class="relative ratio-1/1">
                  <div class="absolute inset-0">
                    <img
                      :src="currentDish.image"
                      :alt="currentDish.name"
                      class="w-full h-full rounded-tl rounded-tr lg:rounded-bl lg:rounded-tr-none object-cover"
                    />
                  </div>
                </div>

                <div
                  class="rounded-full absolute bg-white w-8 h-8 top-0 left-0 ml-2 mt-2 cursor-pointer"
                  @click="close"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 212.982 212.982"
                    style="enable-background:new 0 0 212.982 212.982;"
                    xml:space="preserve"
                    class="w-4 h-4 mx-2 my-2"
                  >
                    <g id="Close">
                      <path
                        style="fill-rule:evenodd;clip-rule:evenodd;"
                        d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
		c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
		l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
		c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div class="dish__view__right lg:w-1/2">
                <div
                  class="dish__view__right__content px-2 pt-2 lg:px-6 lg:py-6"
                >
                  <h1 class="font-bold text-2xl">{{ currentDish.name }}</h1>
                  <h3 class="text-gray-800 mt-4">{{ currentDish.location }}</h3>
                  <p class="text-gray-700 mt-2">{{ currentDish.notes }}</p>
                  <p class="text-gray-600 text-md mt-1">
                    {{ (currentDish.geodistance / 1000).toFixed(1) }} km
                  </p>
                </div>
                <div class="dish__view__right__controls mt-4 flex px-2 lg:px-6">
                  <a
                    class="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 rounded text-center"
                    @click="startDirecting()"
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
    </template>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import isNil from 'lodash/isNil'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dish',
  components: {
    Loader
  },
  data() {
    return {
      isDirecting: false
    }
  },
  head: {
    title: {
      inner: 'Món ăn'
    }
  },
  computed: {
    ...mapState('map', ['currentPositionCoordinates']),
    ...mapState('dishes', [
      'currentDishId',
      'currentDishIndexInPool',
      'isQuerying',
      'dishPool'
    ]),
    ...mapGetters('dishes', ['currentDish'])
  },
  watch: {
    isDirecting: 'toggleDestinationPoint',
    currentDish: 'toggleDestinationPoint'
  },
  mounted() {
    const params = new URLSearchParams(location.search)
    if (isNil(params.get('direction'))) {
      this.isDirecting = false
    } else {
      this.isDirecting = params.get('direction') === 'true'
    }
  },
  methods: {
    close() {
      if (this.dishPool.length === 1) {
        this.$router.push({ name: 'index' })
      } else {
        this.$router.go(-1)
      }
    },
    startDirecting() {
      this.isDirecting = true
      this.toggleDirection()
    },
    stopDirecting() {
      this.isDirecting = false

      this.toggleDirection()
    },
    toggleDirection() {
      const params = new URLSearchParams(location.search)
      params.set('direction', this.isDirecting)
      window.history.replaceState({}, '', `${location.pathname}?${params}`)
    },

    toggleDestinationPoint() {
      if (this.isDirecting === true) {
        if (this.currentDish) {
          const point = {
            lat: this.currentDish.lat,
            lng: this.currentDish.lng,
            image: this.currentDish.image,
            label: this.currentDish.name
          }
          this.setDestination(point)
        }
      } else {
        this.clearDestination()
      }
    },
    ...mapActions('map', ['setDestination', 'clearDestination'])
  }
}
</script>
