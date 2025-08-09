<template>
  <div class="cart__subtotal">
    <span class="cart__subtotal-title">Итого:</span>
    <span class="cart__subtotal-price">{{ getFormatPrice().formattedPrice( cart.total ) }} ₽</span>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore();
</script>

<style scoped lang="scss">
.cart__subtotal {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__subtotal-title {
  font-weight: 500;
  letter-spacing: -.05rem;
}

.cart__subtotal-price {
  font-size: 2rem;
  font-weight: 300;

  @media (max-width: $mobile) {
    font-size: 1.5rem;
  }
}

</style>