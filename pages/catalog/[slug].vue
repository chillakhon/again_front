<template>
  <Breadcrumbs />
  <div class="product" v-if="product">
    <div
        class="product__added"
        :class="{ 'product__added--active': isAddedMessageActive }"
    >
      Товар добавлен в корзину
    </div>

    <div class="product__container container">
      <div class="product__top">
        <ProductGallery
            class="product__gallery"
            :product="product"
        />

        <div class="product__main">
          <ProductHeader
              :sku="product.code"
              :rating="product.avg_rating"
          />
          <h1 class="product__title">{{ product.name }}</h1>

          <ProductPrice
              v-if="product.price"
              :price="product.price"
              :sale="product.old_price"
          />

          <ProductVariations
              v-if="product.variants?.length || product.colors?.length"
              :variations="product.variants"
              :colors="product.colors"
              @get-color="getColor"
              @get-size="getSize"
          />

          <Quantity
              class="product__quantity"
              v-if="product.price && product.stock_quantity > 0"
              @get-quantity="getQuantity"
          />

          <div class="product__actions" v-if="product.stock_quantity > 0">
            <div class="product__actions-buttons">
              <ProductActionsAddToCart
                  v-if="product.price"
                  :quantity="quantity"
                  :product="product"
                  :variation="selectedSize"
                  :color="selectedColor"
                  @add-to-cart="addToCart"
              />
              <div class="product__actions-back">
                <NuxtLink to="/catalog">Вернуться в каталог</NuxtLink>
              </div>
            </div>
            <ProductActionsAddToFav :quantity="quantity" :product="product" />
          </div>

          <div class="product__stock--not" v-else>
            Нет в наличии
          </div>
        </div>
      </div>

      <ProductDescription v-if="product.description" :text="product.description" />
      <ProductReviews :product-id="product.id" />
      <ProductRelated />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/catalog';

const route = useRoute();
const { data: product } = await useApi<Product>( '/products', {
  query: {
    product_id: route.params.slug
  }
} );

const isAddedMessageActive = ref( false );

const quantity = ref( 1 );
const getQuantity = ( value: number ) => {
  quantity.value = value;
}

const selectedColor: Ref = ref( null );
const selectedSize: Ref = ref( null );

const getColor = ( value: object ) => {
  selectedColor.value = value;
}

const getSize = ( value: object ) => {
  selectedSize.value = value;
}

const addToCart = () => {
  isAddedMessageActive.value = true;

  setTimeout( () => {
    isAddedMessageActive.value = false;
  }, 1500 );
}
</script>

<style scoped lang="scss">
.product__stock--not {
  margin-top: 1.5rem;
}

.product {
  position: relative;

  &__added {
    position: absolute;
    right: 0;
    top: 0;
    background: #4CAF50;
    padding: .8rem 1rem;
    font-size: 1.2rem;
    color: var(--fg-white);
    opacity: 0;
    pointer-events: none;
    transition: var(--tr-regular);

    @media (max-width: $mobile) {
      position: fixed;
      top: auto;
      right: auto;
      left: 0;
      bottom: .5rem;
      width: 100%;
      font-size: 1rem;
    }

    &--active {
      opacity: 1;
    }
  }
}
</style>