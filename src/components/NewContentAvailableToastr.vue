<template>
  <div class="wrapper">
    <template v-if="refreshingApp"
      >Loading new content...</template
    >
    <template v-else>
      New content available. Please
      <span class="refresh-btn" @click="$emit('refresh')">REFRESH</span>
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
