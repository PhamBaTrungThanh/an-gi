<template>
  <div>
    <p v-if="products === null" class="infos-label">Loading...</p>
    <p v-if="products && !products.length" class="infos-label">
      You don't have any product yet
    </p>
    <product-item
      v-for="(product, index) in products"
      :key="product.id"
      class="product-row"
      :index="index"
      :is-product-deletion-pending="isProductDeletionPending(product.id)"
      :disable-actions="!networkOnLine"
      :data="product"
      @deleteProduct="deleteUserProduct"
    ></product-item>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { ProductItem },
  computed: {
    ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('products', ['products']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('products', ['deleteUserProduct'])
}
</script>
