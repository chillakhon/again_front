<template>
  <button class="product__actions-cart btn" @click="addToCart( product, quantity, variation, color )">В корзину</button>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";

withDefaults( defineProps<{
  quantity: number,
  product: Product,
  variation?: object | null,
  color?: object | null,
}>(), {
  quantity: 1,
  variation: null,
  color: null
} );

const cartStore = useCartStore();
const { addToCart } = cartStore;
</script>


<style scoped lang="scss">

</style>