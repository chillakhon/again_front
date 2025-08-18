<template>
  <Breadcrumbs />

  <div class="catalog-page page-padding">
    <div class="container catalog-page__container">
      <CatalogFilters
          class="catalog-page__filter"
          @select-prices="getPrice"
          @select-color="getColor"
          @filter-click="filter"
      />
      <div class="catalog-page__body">
        <h1 class="catalog-page__title block__title _small">Каталог</h1>
        <CatalogGrid class="catalog-page__grid" v-if="products" :list="products.data" />
        <Loadmore class="catalog-page__loadmore" v-if="products && products.meta.last_page > 1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta( {
  title: 'Каталог',
} )

import type {Catalog} from "~/types/catalog";

const { data } = await useApi<Catalog>('/products');
const products = ref<Ref>( data );

let priceBefore = 0;
let priceAfter = 999999;
let color = 0;

const getPrice = ( prices: object ) => {
  priceBefore = prices.before;
  priceAfter = prices.after;
}

const getColor = ( id: number ) => {
  color = id;
}

const filter = async () => {
  const { data: filterData } = await useApi<Catalog>('/products', {
    params: {
      price_before: priceBefore,
      price_after: priceAfter,
      color_id: color,
    }
  } );

  products.value = filterData.value;
}
</script>

<style scoped lang="scss">
.catalog-page__container {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: 3.6rem;
  align-items: flex-start;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.catalog-page__title {
  text-align: left;
  margin-bottom: 2rem;

  @media (max-width: $mobile) {
    display: none;
  }
}

.catalog-page__loadmore {
  margin-top: 4.7rem;
  display: flex;
  justify-content: center;
}

</style>