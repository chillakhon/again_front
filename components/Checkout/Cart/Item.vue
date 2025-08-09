<template>
  <div class="checkout-cart__item">
    <div class="checkout-cart__item-main">
      <div class="checkout-cart__item-media cart-item__media">
        <picture class="cart-item__media-pic">
          <img
              :src="getImage( product.main_image?.path ? product.main_image?.path : '' )"
              class="cart-item__media-img"
              :alt="product.name"
          >
        </picture>
      </div>
      <div class="checkout-cart__item-content">
        <div class="checkout-cart__item-title cart-item__title">{{ product.name }}</div>
        <CartVariants
            class="checkout-cart__item-variables"
            :variant="product.selected_variant"
            :color="product.selected_color"
        />
      </div>
    </div>
    <div class="checkout-cart__item-quantity">{{ product.quantity }}</div>
    <div class="checkout-cart__item-price price" v-if="product.price">
      <div class="price__new">{{ getNormalPrice( product.price, product.old_price ) }} ₽</div>
      <div class="price__old" v-if="product.old_price">{{ formattedPrice( product.old_price ) }} ₽</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";

defineProps<{
  product: Product
}>();

const { getNormalPrice, formattedPrice } = getFormatPrice();
</script>

<style scoped lang="scss">
.checkout-cart__item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 3.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.checkout-cart__item-main {
  display: flex;
  align-items: flex-start;
  max-width: 80%;
}

.checkout-cart__item-content {
  padding-left: 2.7rem;
}

.checkout-cart__item-quantity {
  line-height: 145%;
  font-size: var(--fz-1-8);
}

</style>