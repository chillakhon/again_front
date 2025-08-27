<template>
  <Breadcrumbs />
  <div class="catalog-page page-padding">
    <div class="container catalog-page__container">
      <CatalogFilters
          class="catalog-page__filter"
          @filter-click="submitFilter"
      />

      <div class="catalog-page__body">
        <h1 class="catalog-page__title block__title _small">Каталог</h1>
        <template v-if="nProducts.data">
          <CatalogGrid
              class="catalog-page__grid"
              :list="nProducts.data"
          />

          <Loadmore
              class="catalog-page__loadmore"
              v-if="nProducts.meta.last_page > 1 && page !== nProducts.meta.last_page"
              @load-more="loadMore"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Catalog} from "~/types/catalog";

/**
 *       <CatalogFilters
 *           class="catalog-page__filter"
 *           @select-prices="getPrice"
 *           @select-color="getColor"
 *           @filter-click="filter"
 *           @reset-click="reset"
 *       />
 *       <div class="catalog-page__body">
 *         <h1 class="catalog-page__title block__title _small">Каталог</h1>
 *         <template v-if="products.data.length > 0">
 *           <CatalogGrid class="catalog-page__grid" :list="products.data" />
 *           <Loadmore
 *               class="catalog-page__loadmore"
 *               v-if="products.meta.last_page > 1"
 *               @load-more="loadMore"
 *           />
 *         </template>
 *
 *         <NotFound v-else />
 *       </div>
 */

definePageMeta( {
  title: 'Каталог',
} );

const meta = ref( {
  last_page: 4
} );
const filters = ref( {
  color: 0,
  price: {
    before: '',
    after: '',
  }
} );
const page = ref( 1 );

// const { data: products, refresh } = await useApi<Catalog>('/products', {
//   query: {
//       color_id: filters.value.color || '',
//       price_before: filters.value.price.before || '',
//       price_after: filters.value.price.after || '',
//   }
// } );
// watch(data, (newData ) => {
//   if ( newData?.data ) {
//     products.value = [...products.value, ...newData.data];
//     //hasMoreProducts.value = newData.products.length === perPage;
//   }
// });
const { data: products, pending, refresh } = await useAsyncData(
    'products',
    async () => {
      const response = await $fetch('http://193.233.84.235/api/products', {
        query: {
            per_page: 24,
            page: page.value,
            color_id: filters.value.color || '',
            price_before: filters.value.price.before || '',
            price_after: filters.value.price.after || '',
        }
      } );
      return response;
    },
    {
      server: true,
      immediate: true
    }
);

const nProducts = ref( products );

watch( products, ( newProducts, oldProducts ) => {
  console.log( newProducts );
  if ( newProducts?.data ){
    if ( page.value === 1 ){
      nProducts.value.data = newProducts.data;
    } else {
      nProducts.value.data = [ ...oldProducts.data, ...newProducts.data ];
    }
  }
} )

const submitFilter = ( args: object ) => {
  page.value = 1;
  filters.value.color = args.color;
  filters.value.price.after = args.price.before;
  filters.value.price.before = args.price.after;

  refresh();
}

const loadMore = () => {
  page.value += 1;
  refresh();
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