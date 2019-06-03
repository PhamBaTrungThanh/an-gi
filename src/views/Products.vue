<template>
  <div class="page-wrapper">
    <h1 class="products-page-title">Products page</h1>
    <product-list class="product-list"></product-list>
    <add-product v-if="networkOnLine"></add-product>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'

export default {
  components: { ProductList, AddProduct },
  computed: mapState('app', ['networkOnLine'])
}
</script>
