<template>
  <section class="catalog section">
    <div class="catalog__container container">

      <div class="flex w-full justify-end p-1 pb-2">
        <NuxtLink to="/catalog" class="px-4 py-2 text-[15px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
          Все товары
        </NuxtLink>
      </div>

      <CatalogGrid v-if="products" :list="products.data"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";

const {data: products} = await useApi<{
  data: Product[]
}>('/products', {
  query: {
    per_page: 6,
    in_stock: 1,
    sort_by: 'display_order',
    sort_order: 'asc',
  }
})
</script>

<style scoped lang="scss">
.catalog-page__button {
  margin-top: 4.7rem;
  display: flex;
  justify-content: center;
}

</style>