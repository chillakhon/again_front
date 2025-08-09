<template>
  <Breadcrumbs />

  <ClientOnly>
    <div class="checkout">
      <div class="checkout__container container">
        <NotFound v-if="cartStore.cart.length === 0" class="cart__not" :is-title="true" to="/catalog" />
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
                  v-model:surname="form.value.user.surname"
                  v-model:phone="form.value.user.phone"
              />
              <CheckoutPayment @click-to-button="submit" />
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
              <CheckoutTotal :with-button="false" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const userStore = useAuthStore();

const form = computed( () => {
  return ref( {
    promo_code: '',
    user: {
      first_name: userStore.user.profile.first_name,
      last_name: userStore.user.profile.last_name,
      surname: userStore.user.profile.surname,
      phone: userStore.user.profile.phone
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
  const { data } = await useApi('/orders', {
    body: form.value
  }, '', 'POST')
}
</script>

<style scoped lang="scss">

</style>