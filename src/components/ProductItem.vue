<template>
  <div class="product-item">
    <div>#{{ index }} {{ data.name }}</div>
    <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteProduct', data.id)"
    >
      {{ isProductDeletionPending ? 'delete in progress...' : 'delete' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    index: Number,
    isProductDeletionPending: Boolean,
    disableActions: Boolean
  }
}
</script>
