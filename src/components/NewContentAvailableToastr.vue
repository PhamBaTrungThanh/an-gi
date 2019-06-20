<template>
  <div
    class="fixed left-0 bottom-0 right-0 text-center z-30 mx-4 mb-1 bg-gray-700 text-white px-3 py-2 rounded"
  >
    <template v-if="refreshingApp"
      >Đang tải nội dung mới...</template
    >
    <template v-else>
      Đã có bản cập nhật mới, xin hãy
      <span class="underline" @click="$emit('refresh')">CÀI ĐẶT</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    refreshingApp: Boolean
  }
}
</script>
