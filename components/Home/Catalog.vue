<template>
  <section class="catalog section">
    <div class="catalog__container container">
      <CatalogGrid v-if="products" :list="products.data" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";

const { data: products } = await useApi<{
  data: Product[]
}>( '/products', {
  query: {
    per_page: 6,
    in_stock: 1,
    sort_by: 'display_order',
    sort_order: 'asc',
  }
} )
</script>

<style scoped lang="scss">
.catalog-page__button {
  margin-top: 4.7rem;
  display: flex;
  justify-content: center;
}

</style>