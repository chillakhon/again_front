<template>
  <Breadcrumbs />


    <div class="cart">
      <div class="cart__container container">
        <NotFound v-if="cartStore.cart.length === 0" class="cart__not" :is-title="true" to="/catalog" />
        <ClientOnly v-else-if="cartStore.cart.length">
          <div class="cart__grid">
            <div class="cart__main">
              <div class="cart-block__header block__header _small">
                <div class="block__header-left">
                  <h1 class="block__header-title">Корзина</h1>
                  <div class="block__header-counter">{{ cartStore.quantity }}</div>
                </div>
                <div class="block__header-right">
                  <button class="cart__remove" @click="cartStore.setEmptyCart()">очистить</button>
                </div>
              </div>
              <CartProgress />
              <CartTable />
            </div>
            <CartTotal :with-button="true" />
          </div>
        </ClientOnly>
      </div>

      <ProductRelated v-if="cartStore.cart.length > 0" />

    </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
</script>

<style scoped lang="scss">

</style>