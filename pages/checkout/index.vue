<template>
  <Breadcrumbs />

  <ClientOnly>
    <div class="checkout">
      <div class="checkout__container container">
        <div class="checkout__message" v-if="!userStore.isAuthenticated">
          <h2 class="checkout__message-title">Для оформления заказа требуется авторизоваться</h2>
          <NuxtLink to="/login" class="checkout__message__btn btn _left">Авторизоваться</NuxtLink>
        </div>
        <template v-else-if="cartStore.cart.length">
          <div class="checkout__form">
            <div class="checkout-block__header block__header _small">
              <div class="block__header-title">Оформление заказа</div>
            </div>
            <div class="checkout__row">
              <div class="checkout__block">
                <CheckoutUser />
              </div>
              <CheckoutDelivery
                  v-model:country-code="form.value.country_code"
                  v-model:city-name="form.value.city_name"
                  v-model:address="form.value.delivery_address"
                  v-model:notes="form.value.notes"
              />
              <CheckoutRecipient
                  v-model:first-name="form.value.user.first_name"
                  v-model:last-name="form.value.user.last_name"
                  v-model:phone="form.value.user.phone"
              />
              <CheckoutPayment @click-to-button="submit" :is-loading="isLoading" />
            </div>
          </div>
          <div class="checkout__items">
            <div class="checkout__items-block__header block__header _small">
              <div class="block__header-title">Оформление заказа</div>
            </div>
            <div class="checkout__cart">
              <CheckoutCartItem
                  v-for="item in cartStore.cart"
                  :key="item.id"
                  :product="item"
              />
            </div>
            <div class="checkout__total">
              <CheckoutTotal
                  :with-button="false"
                  v-model:promo-code="form.value.promo_code"
              />
            </div>
          </div>
        </template>
        <NotFound v-else-if="cartStore.cart.length === 0" class="cart__not" :is-title="true" to="/catalog" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const userStore = useAuthStore();
const isLoading = ref( false );

const form = computed( () => {
  return ref( {
    promo_code: '',
    user: {
      first_name: userStore.user?.profile?.first_name || '',
      last_name: userStore.user?.profile?.last_name|| '',
      phone: userStore.user?.profile?.phone || ''
    },
    country_code: 'RU',
    city_name: 'Москва',
    delivery_address: 'Ленина 12',
    //delivery_method_id: 2,
    //delivery_type_code: 'cdek_courier',
    notes: 'Комментарий',
    //tariff: {},
    items: cartStore.getCartForCheckout()
  } );
} );

const submit = async () => {
  isLoading.value = true;

  const { data, error } = await useApi('/orders', {
    body: form.value
  }, '', 'POST');

  isLoading.value = false;

  if ( data.value.success === true ){
    cartStore.setEmptyCart();
    return navigateTo( '/success?id=' + data.value.order.id );
  }
}
</script>

<style scoped lang="scss">
.checkout__message__btn {
  margin-top: 2rem;
}
</style>