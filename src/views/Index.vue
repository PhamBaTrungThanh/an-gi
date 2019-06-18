<template>
  <div
    class="fixed bottom-0 left-0 right-0 h-1/3-screen lg:left-auto lg:h-full lg:w-1/4 z-10 home__panel flex"
  >
    <div class="relative m-2 w-full home__panel__container">
      <div
        class="home__panel__content h-full bg-white shadow rounded-sm border-solid border border-gray-500 flex flex-col"
      >
        <div class="page__header flex-none mt-1 lg:mt-3">
          <img src="@/assets/logo.png" class="mx-auto w-20 h-20" />
          <h2 class="text-lg text-gray-700 text-center">Ăn Gì Đây?</h2>
        </div>
        <div
          class="search__control mt-2 lg:mt-5 mx-auto w-10/12 flex-auto flex items-center lg:items-start"
        >
          <div class="search__control__content flex-auto">
            <input
              v-model="searchString"
              type="search"
              placeholder="Bạn muốn ăn gì?"
              class="block bg-gray-100 border border-solid border-gray-300 rounded-sm text-gray-800 px-2 py-1 w-full"
              @keydown.enter="search"
            />
            <div class="text-center">
              <a
                class="inline-block mt-2 mx-auto cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-center"
                @click="search"
                >Tìm kiếm</a
              >
            </div>
          </div>
        </div>
        <!-- <div class="separator mt-1 text-gray-500 text-center italic text-sm">
          <span class>hoặc</span>
        </div>
        <div class="navigation__control flex mt-2 mx-auto w-10/12">
          <div class="flex-1 mr-1 flex">
            <a
              class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-center w-full"
              >Xem Danh Mục</a
            >
          </div>

          <div class="flex-1 ml-1 flex">
            <a
              class="cursor-pointer bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded text-center w-full"
              >Xem Bookmark</a
            >
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      searchString: ''
    }
  },
  head: {
    title: {
      inner: 'Trang chủ'
    },
    meta: [
      {
        name: 'description',
        content: 'Trang chủ Ăn Gì Đây',
        id: 'desc'
      }
    ]
  },
  computed: mapState('app', ['appTitle']),
  mounted() {},

  methods: {
    search() {
      this.$router.push({
        name: 'search',
        params: {
          query: this.searchString
        }
      })
    }
  }
}
</script>
