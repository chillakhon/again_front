<template>
  <ClientOnly>
    <div v-if="cartStore.cart.length > 0">
      <div class="mini-cart__row">
        <MiniCartItem
            v-for="item in cartStore.cart"
            :key="item.id"
            :id="item.id"
            :image="item.main_image?.path"
            :quantity="item.quantity"
            :title="item.name"
            :price="item.price"
            :old-price="item.old_price"
            :item-key="item.item_key"
            :selected-color="item.selected_color"
            :selected-variant="item.selected_variant"
        />
      </div>
      <div class="mini-cart__bottom">
        <MiniCartTotal />
        <NuxtLink
            to="/checkout"
            class="mini-cart__btn btn _60"
            @click="asideMenu.close()"
        >
          Оформить заказ
        </NuxtLink>
      </div>
    </div>

    <NotFound v-else class="mini-cart__not" to="/catalog" @click-to-button="asideMenu.close()" />
  </ClientOnly>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const asideMenu = useAsideMenuStore();
</script>

<style scoped lang="scss">
.mini-cart__not {
  margin-top: 3rem;
}
</style>