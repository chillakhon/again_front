<template>
  <div class="cart__total" :class="{ '_border': isBorder }">
    <div class="cart__total-top">
      <div class="cart__summary cart-summary">
        <div class="cart-summary__item">
          <span class="cart-summary__item-title">Всего</span>
          <span class="cart-summary__item-price">{{ getFormatPrice().formattedPrice( cart.total ) }} ₽</span>
        </div>
<!--        <div class="cart-summary__item">-->
<!--          <span class="cart-summary__item-title">Скидка</span>-->
<!--          <span class="cart-summary__item-price">3 000 ₽</span>-->
<!--        </div>-->
      </div>
    </div>
    <div class="cart__total-bottom">
      <CartSubtotal />
      <NuxtLink v-if="withButton" to="/checkout" class="cart__checkout btn _wide _15 _60">Оформить заказ</NuxtLink>
      <CartPromocode v-if="isPromocode" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults( defineProps<{
  isBorder?: boolean,
  isPromocode?: boolean,
  withButton?: boolean
}>(),{
  isBorder: false,
  isPromocode: true,
  withButton: true
} );

const cart = useCartStore();
const getTotal = computed( () => {
  return cart.total;
} )
</script>

<style scoped lang="scss">
.cart__total {
  border-radius: var(--br-regular);
  border: .1rem solid #E5E5E5;

  &-top {
    padding: 3.2rem 2.7rem 3rem;

    @media (max-width: $tablet) {
      padding: 1.6rem 1.5rem 2.1rem;
    }
  }

  &-bottom {
    padding: 2.3rem 2.7rem 3.8rem 2.8rem;
    border-top: .1rem solid #E5E5E5;

    @media (max-width: $tablet) {
      padding: 1.7rem 1.7rem 2.5rem 1.5rem;
    }
  }

  @media (max-width: $tablet) {
    &:not(._border) {
      margin-left: var(--m-m-container);
      margin-right: var(--m-m-container);
      border-radius: 0;
      padding: 2.4rem var(--p-container) 2rem;
      background: #F6F5F3;
      border: none;
    }
  }
}

@media (max-width: $tablet) {
  .cart__total:not(._border) .cart__total-top {
    padding: 0;
  }

  .cart__total:not(._border) .cart__total-bottom {
    padding: 0;
    border: none;
    margin-top: 2rem;
  }
}

.cart-summary__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.cart-summary__item-title {
  color: #2F2F2F;
  opacity: .7;
  font-size: var(--fz-secondary);
}

.cart-summary__item-price {
  font-weight: 300;
  line-height: var(--fz-regular);
  font-size: var(--fz-regular);
}

.cart__checkout {
  margin-top: 3.5rem;
}

</style>