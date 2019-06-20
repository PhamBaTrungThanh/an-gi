/* eslint-disable vue/order-in-components */
<template>
  <div
    class="fixed bottom-0 left-0 right-0 h-full pt-20 z-10 lg:left-auto lg:h-full lg:w-1/4 lg:pt-2 lg:p-2"
  >
    <div
      class="bg-white w-full h-full rounded-sm border-solid border-top border-gray-500 p-4 flex flex-col"
    >
      <div class="search__control__content flex">
        <input
          v-model="queryString"
          placeholder="Bạn muốn ăn gì?"
          class="bg-gray-100 border border-solid border-gray-300 rounded-sm text-gray-800 px-2 py-1 flex-1 w-full"
          :disabled="loading === true"
          @keydown.enter="search"
          @focus="$event.target.select()"
        />
        <!-- <a class="cursor-pointer ml-1" @click="search">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
          >
            <path
              d="M32.3297 32.3297C31.6468 33.0125 30.5187 33.0125 29.8062 32.3297L26.0359 28.5594C25.3531 27.8766 25.3531 26.7484 26.0359 26.0359C26.7187 25.3531 27.8468 25.3531 28.5593 26.0359L32.3297 29.8063C33.0125 30.5188 33.0125 31.6469 32.3297 32.3297Z"
              fill="white"
            ></path>
            <path
              d="M22.869 22.8848C26.9268 18.827 26.9268 12.2481 22.869 8.19034C18.8113 4.13259 12.2324 4.13259 8.1746 8.19034C4.11685 12.2481 4.11685 18.827 8.1746 22.8848C12.2324 26.9425 18.8113 26.9425 22.869 22.8848Z"
              fill="white"
            ></path>
            <path
              d="M22.869 22.8848C26.9268 18.827 26.9268 12.2481 22.869 8.19034C18.8113 4.13259 12.2324 4.13259 8.1746 8.19034C4.11685 12.2481 4.11685 18.827 8.1746 22.8848C12.2324 26.9425 18.8113 26.9425 22.869 22.8848Z"
              fill="white"
            ></path>
            <path
              d="M15.5266 25.0266C15.0219 25.0266 14.6359 24.6406 14.6359 24.1359C14.6359 23.6313 15.0219 23.2453 15.5266 23.2453C17.575 23.2453 19.5344 22.4437 20.9891 20.9891C22.8891 19.0891 23.6609 16.3875 23.0375 13.7453C22.9187 13.2703 23.2156 12.7953 23.6906 12.6766C24.1656 12.5578 24.6406 12.8547 24.7594 13.3297C25.5312 16.5656 24.6109 19.9203 22.2656 22.2656C20.4547 24.0469 18.0797 25.0266 15.5266 25.0266Z"
              fill="#71C2FF"
            ></path>
            <path
              d="M21.6719 10.3906C21.4344 10.3906 21.2266 10.3016 21.0484 10.1234L20.9891 10.0937C20.6328 9.7375 20.6328 9.17343 20.9891 8.84687C21.3453 8.49062 21.9094 8.49062 22.2359 8.84687L22.2953 8.90624C22.6516 9.26249 22.6516 9.82656 22.2953 10.1531C22.1172 10.3016 21.9094 10.3906 21.6719 10.3906Z"
              fill="#71C2FF"
            ></path>
            <path
              d="M15.5266 26.8078C12.6469 26.8078 9.73755 25.7094 7.54067 23.5125C3.14692 19.1187 3.14692 11.9641 7.54067 7.57031C11.9344 3.17656 19.0891 3.17656 23.4829 7.57031C27.9063 11.9641 27.9063 19.1187 23.5125 23.5125C21.3157 25.7094 18.436 26.8078 15.5266 26.8078ZM15.5266 6.05624C13.0922 6.05624 10.6579 6.97656 8.81724 8.84687C5.1063 12.5578 5.1063 18.5844 8.81724 22.2953C12.5282 25.9469 18.5547 25.9469 22.2657 22.2656C25.9766 18.5547 25.9766 12.5281 22.2657 8.81718C20.3954 6.97656 17.961 6.05624 15.5266 6.05624Z"
              fill="#444B54"
            ></path>
            <path
              d="M32.9531 29.1828L29.1828 25.4125C28.6781 24.9078 27.9953 24.6406 27.2828 24.6406C26.8672 24.6406 26.4813 24.7297 26.125 24.9078L25.3828 24.1656C25.0266 23.8094 24.4625 23.8094 24.136 24.1656C23.7797 24.5219 23.7797 25.0859 24.136 25.4125L24.8781 26.1547C24.7 26.5109 24.611 26.8969 24.611 27.3125C24.611 28.025 24.8781 28.7078 25.3828 29.2125L29.1828 32.9531C29.7172 33.4875 30.4 33.725 31.0828 33.725C31.7656 33.725 32.4485 33.4578 32.9828 32.9531C33.9922 31.9141 33.9922 30.2219 32.9531 29.1828ZM31.7063 31.7062C31.35 32.0625 30.786 32.0625 30.4594 31.7062L26.6594 27.9359C26.4813 27.7578 26.3922 27.55 26.3922 27.3125C26.3922 27.075 26.4813 26.8375 26.6594 26.6891C26.8375 26.5109 27.0453 26.4219 27.2828 26.4219C27.5203 26.4219 27.7578 26.5109 27.9063 26.6891L31.6766 30.4594C32.0625 30.7859 32.0625 31.35 31.7063 31.7062Z"
              fill="#444B54"
            ></path>
          </svg>
        </a>-->
      </div>
      <div v-if="isQuerying === true" class="mt-20">
        <loader></loader>
      </div>
      <div
        v-if="isQuerying === false"
        class="dishes__result mt-2 flex-1 overflow-y-auto"
      >
        <template v-if="dishPool.length === 0">
          <h2 class="text-lg text-center font-bold text-gray-800 mt-4">
            Rất tiếc
          </h2>
          <p class="mt-2 text-gray-600">
            Chúng tôi không tìm thấy món ăn bạn yêu cầu, bạn có thể thử lại
            không?
          </p>
        </template>
        <template v-else>
          <div
            v-for="dish in dishPool"
            :key="dish.id"
            class="dish__result"
            @click="goToDish(dish.id)"
          >
            <div class="dish__result__card p-2 flex bg-gray-100 mt-2 rounded">
              <img :src="dish.image" class="w-16 h-16 object-cover rounded" />
              <div class="dish__result__information ml-2 -mt-1 relative flex-1">
                <h3 class="font-bold">
                  <span>{{ dish.name }}</span>
                </h3>
                <p class="text-sm text-gray-600">
                  <span>{{ dish.location }}</span>
                </p>
                <small class="text-xs text-gray-500 absolute bottom-0 right-0"
                  >~{{ (dish.geodistance / 1000).toFixed(1) }} km</small
                >
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

import { mapState } from 'vuex'

export default {
  name: 'Search',
  components: {
    Loader
  },
  data() {
    return {
      loading: false,
      error: false,
      queryString: this.$route.params.query
    }
  },
  head: {
    title: {
      inner: 'Tìm kiếm'
    },
    meta: [
      {
        name: 'description',
        content: 'Tìm kiếm món ăn',
        id: 'desc'
      }
    ]
  },
  computed: {
    ...mapState('map', ['currentPositionCoordinates']),
    ...mapState('dishes', ['isQuerying', 'dishPool'])
  },

  methods: {
    search() {
      this.$router.push({
        name: 'search',
        params: {
          query: this.queryString
        }
      })
    },
    goToDish(id) {
      this.$router.push({
        name: 'dish',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
