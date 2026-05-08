<template>
  <Breadcrumbs/>

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
                <CheckoutUser/>
              </div>

              <CheckoutGiftCardData
                  ref="giftCardDataRef"
              />

              <CheckoutDelivery
                  v-model:country-code="form.value.country_code"
                  v-model:city-name="form.value.city_name"
                  v-model:address="form.value.delivery_address"
                  v-model:notes="form.value.notes"
              />
              <CheckoutRecipient
                  ref="recipientRef"
                  v-model:first-name="form.value.user.first_name"
                  v-model:last-name="form.value.user.last_name"
                  v-model:phone="form.value.user.phone"
              />

              <CheckoutPayment
                  @click-to-button="submit"
                  :is-loading="isLoading"
              />
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

              <CheckoutGiftCard/>

            </div>
          </div>
        </template>
        <NotFound v-else-if="cartStore.cart.length === 0" class="cart__not" :is-title="true" to="/catalog"/>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {useCartStore} from '~/stores/cart';
import {useAuthStore} from '~/stores/auth';
import {useGiftCardPaymentStore} from '~/stores/giftCardPayment';
import {useGiftCardPurchaseStore} from '~/stores/giftCardPurchase';
import {usePromotionStore} from '~/stores/promotion';
import type {Country} from "~/types/countries";

const cartStore = useCartStore();
const userStore = useAuthStore();
const giftCardPaymentStore = useGiftCardPaymentStore();
const giftCardPurchaseStore = useGiftCardPurchaseStore();
const promotionStore = usePromotionStore();

// Проверяем применимые акции при загрузке checkout.
// Важно: cartStore.total пересчитывается через cartInit() в app.vue::onMounted,
// который выполняется ПОСЛЕ onMounted этой страницы (child → parent).
// Поэтому здесь нельзя дёргать checkApplicable с total=0 — бэк отфильтрует все акции
// по min_purchase_amount и reset() затрёт уже выставленный selectedGift.
const runPromotionCheck = async () => {
  if (cartStore.cart.length > 0 && cartStore.total > 0) {
    await promotionStore.checkApplicable(cartStore.cart, cartStore.total);
  } else if (cartStore.cart.length === 0) {
    promotionStore.reset();
  }
};

onMounted(async () => {
  await nextTick();
  await runPromotionCheck();
});

// Перепроверяем при изменении корзины или total (после cartInit)
watch(() => [cartStore.cart.length, cartStore.total], runPromotionCheck);
const isLoading = ref(false);
const giftCardDataRef = ref(null);

const recipientRef = ref<{
  selectedCountry: Country | null,
  setPhoneError: (msg: string) => void,
  $el: HTMLElement
} | null>(null);

const form = computed(() => {
  return ref({
    promo_code: cartStore.promoCode,
    gift_card_data: '',
    gift_card_code: giftCardPaymentStore.giftCardCode,
    user: {
      first_name: userStore.user?.profile?.first_name || '',
      last_name: userStore.user?.profile?.last_name || '',
      phone: userStore.user?.profile?.phone || ''
    },
    country_code: 'RU',
    city_name: 'Москва',
    delivery_address: 'Ленина 12',
    notes: 'Комментарий',
    items: cartStore.getCartForCheckout()
  });
});


const validateRecipientPhone = () => {
  const selectedCountry = recipientRef.value?.selectedCountry ?? null;

  if (!selectedCountry || !form.value.value.user.phone) {
    return true;
  }

  const { validatePhoneLength } = usePhoneMask();
  const isPhoneValid = validatePhoneLength(
      form.value.value.user.phone,
      selectedCountry.phone_code,
      selectedCountry.phone_length
  );

  if (!isPhoneValid) {
    recipientRef.value?.setPhoneError(`Номер должен содержать ${selectedCountry.phone_length} цифр`);
    recipientRef.value?.$el?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    return false;
  }

  recipientRef.value?.setPhoneError('');
  return true;
};


const submit = async () => {
  // Валидация данных сертификата (если есть в корзине)


  if (cartStore.hasGiftCertificateInCart) {


    const isValid = giftCardDataRef.value?.validate();

    if (!isValid) {
      // Скроллим к форме с ошибками
      giftCardDataRef.value?.$el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }
  }


  // Валидация телефона
  if (!validateRecipientPhone()) {
    return;
  }


  isLoading.value = true;

  // Добавляем данные сертификата в запрос
  const formVal = form.value.value;
  const requestData = {
    ...formVal,
    delivery_address: {
      country: formVal.country_code ?? '',
      city: formVal.city_name ?? '',
      address: formVal.delivery_address ?? '',
    },
  };
  delete requestData.country_code;
  delete requestData.city_name;


  if (cartStore.hasGiftCertificateInCart) {
    requestData.gift_card_data = giftCardPurchaseStore.getDataForAPI(
        userStore.user?.email,
        userStore.user?.profile?.phone
    );
  }

  // Добавляем данные акции (если есть)
  if (promotionStore.hasPromotion) {
    const promotionData = promotionStore.getDataForOrder();
    Object.assign(requestData, promotionData);

    // Если пользователь выбрал подарок — убираем промокод
    if (!promotionStore.useDiscountInstead) {
      delete requestData.promo_code;
    }
  }

  const {data, error} = await useApi('/orders', {
    body: requestData
  }, '', 'POST');

  isLoading.value = false;

  if (data.value?.success === true) {
    cartStore.setEmptyCart();
    promotionStore.reset();
    return navigateTo('/success?id=' + data.value.order.id);
  }

  if (error.value) {
    console.error('Order error:', error.value);
    // TODO: Показать ошибку пользователю
  }
}




</script>

<style scoped lang="scss">
.checkout__message__btn {
  margin-top: 2rem;
}
</style>