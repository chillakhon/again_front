<template>
  <div class="cart__promo">
    <div class="cart__promo-flex">
      <input
          type="text"
          class="cart__promo-input"
          placeholder="Активировать промокод"
          v-model="promoCode"
      >
      <button class="cart__promo-button" @click="testPromocode">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.000649004 5.78519L10.0573 5.7852L5.44157 1.16944L6.611 -5.78009e-07L13.2227 6.61165L6.611 13.2233L5.44157 12.0539L10.0573 7.43811L-0.000649149 7.43811L-0.000649004 5.78519Z" fill="#3F3F3F"/>
        </svg>
      </button>
    </div>

    <div class="cart__promo-message" :class="[ promoClass ]">{{ promoMessage }}</div>
  </div>
</template>

<script setup lang="ts">
const promoCode = ref( '' );
const promoMessage = ref( '' );
const promoClass = ref( '' );

const cart = useCartStore();

const testPromocode = async () => {
  if ( promoCode.value ) {
    const { data: promo, error } = await useApi( '/promo-codes/validate?code=' + promoCode.value );

    if ( promo.value && promo.value.message ){
      promoMessage.value = promo.value.message;
      promoClass.value = 'cart__promo-message--success';

      cart.countCartPromocode( promoCode.value, promo.value.promo_code.discount_type, promo.value.promo_code.discount_amount );
    } else if ( error?.value?.data.message ) {
      promoMessage.value = 'Промокод применен';
      promoClass.value = 'cart__promo-message--error';
    }
  }
}
</script>

<style scoped lang="scss">
.cart__promo {
  position: relative;
  --height: 6.6rem;
  --bg: rgba(216, 216, 216, .25);
  margin-top: 4rem;

  @media (max-width: $mobile) {
    margin-top: 2rem;
    --height: 5rem;
  }
}

.cart__promo-input {
  width: 100%;
  height: var(--height);
  border-radius: 1rem;
  border: none;
  background: var(--bg);
  padding: 0 7rem 0 1.8rem;
  font-size: 1.4rem;
}

.cart__promo-button {
  position: absolute;
  right: 0;
  top: 0;
  height: var(--height);
  min-width: 5.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  box-shadow: inset 0 0 40px 0 rgba(216, 216, 216, 0.25);
  border-radius: 1rem;
}

.cart__promo-message {
  margin-top: 1rem;
  font-size: 1.2rem;

  &--error {
    color: var(--fg-red);
  }

  &--success {
    color: var(--fg-green);
  }
}

</style>