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

const { data: products } = await useApi<Catalog>( '/products' );

const priceBefore = ref( 0 );
const priceAfter = ref( 999999 );

const getPrice = ( prices: object ) => {
  priceBefore.value = prices.before;
  priceAfter.value = prices.after;
}

const color = ref( 1 );
const getColor = ( id: number ) => {
  color.value = id;
}

const filter = () => {
  console.log( 'INIT' );
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