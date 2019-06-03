<template>
  <div class="product-action-bar">
    <input
      placeholder="product name..."
      class="product-name-input"
      type="text"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProductAction"
    />
    <div
      :class="{ disabled: productCreationPending }"
      class="create-product-btn"
      @click="triggerAddProductAction"
    >
      add product
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState('products', [
    'productNameToCreate',
    'productCreationPending'
  ]),
  methods: {
    ...mapMutations('products', ['setProductNameToCreate']),
    ...mapActions('products', ['triggerAddProductAction'])
  }
}
</script>
