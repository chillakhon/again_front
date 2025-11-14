<template>
  <Breadcrumbs/>
  <div class="catalog-page page-padding">
    <div class="container catalog-page__container">
      <CatalogFilters
          class="catalog-page__filter"
          @filter-click="submitFilter"
          @reset-click="resetFilter"
      />

      <div class="catalog-page__body">
<!--        <h1 class="catalog-page__title block__title _small">Каталог</h1>-->
        <template v-if="nProducts?.data?.length > 0">
          <CatalogGrid
              class="catalog-page__grid"
              :list="nProducts?.data"
          />

          <Loadmore
              class="catalog-page__loadmore"
              v-if="nProducts?.meta.last_page > 1 && page !== nProducts?.meta.last_page"
              @load-more="loadMore"
          />
        </template>
        <NotFound v-else/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Catalog} from "~/types/catalog";
import {getFilterParams} from "~/utils/getFilterParams";
import {useApi} from "~/composables/useApi";

definePageMeta({
  title: "Каталог",
});

const route = useRoute();
const filters = getFilterParams();
const page = ref(1);

const {data: products, refresh} = await useAsyncData(
    "products",
    async () => {
      // формируем query параметры
      const query = {
        per_page: 9,
        page: page.value,
        color_id: filters.value.color || "",
        price_before: filters.value.price.before || "",
        price_after: filters.value.price.after || "",
        in_stock: filters.value.in_stock || false,
        search: filters.value.search || "",
        sort_by: 'display_order',
        sort_order: 'asc',
      };

      // Используем useApi (GET по умолчанию)
      const {data, error} = await useApi<Catalog>("/products", {query});

      if (error.value) {
        console.error("Ошибка загрузки продуктов:", error.value);
        return {data: [], meta: {}};
      }

      return data.value;
    },
    {
      server: true,
      immediate: true,
    }
);

const nProducts = ref(products);

watch(products, (newProducts, oldProducts) => {
  if (newProducts?.data) {
    if (page.value === 1) {
      nProducts.value.data = newProducts.data;
    } else {
      nProducts.value.data = [...oldProducts.data, ...newProducts.data];
    }
  }
});

watch(route, (newQuery) => {
  if (newQuery.query.hasOwnProperty("search") && newQuery.query.search) {
    filters.value.search = newQuery.query.search;
    refresh();
  }
});

const submitFilter = (args: any) => {
  page.value = 1;
  filters.value.color = args.color;
  filters.value.price.after = args.price.before;
  filters.value.price.before = args.price.after;
  filters.value.in_stock = 1;

  refresh();
};

const loadMore = () => {
  page.value += 1;
  refresh();
};

const resetFilter = () => {
  page.value = 1;
  filters.value.color = "";
  filters.value.price.after = "";
  filters.value.price.before = "";
  filters.value.search = ''
  filters.value.in_stock = 0;
  refresh();
};
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