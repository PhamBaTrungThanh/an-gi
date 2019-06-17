<template>
  <div class="wrapper">
    <template v-if="refreshingApp"
      >Đang tải nội dung mới...</template
    >
    <template v-else>
      Đã có bản cập nhật mới, xin hãy
      <span class="refresh-btn" @click="$emit('refresh')">CÀI ĐẶT</span>
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
