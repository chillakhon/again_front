<template>
  <div class="checkout__block">
    <div class="checkout__block-title fz-h2">Способ оплаты*</div>
    <div class="checkout__payment">
      <FormRadio
          name="payment"
          :is-checked="true"
          title="Оплата картой РФ"
      />
      <FormRadio
          name="payment"
          title="SberPay, рассрочка, иностранная карта"
      />
      <FormRadio
          name="payment"
          title="Рассрочка Яндекс СПЛИТ"
          text="Онлайн оплата картами Visa<br> Mastercard, МИР и частями"
      />
    </div>
    <div class="checkout__submit">
      <button
          class="checkout__btn btn _loader"
          @click="emit( 'clickToButton' )"
          :class="{ '_loading': isLoading }"
          :disabled="isDisabled"
      >
        Подтвердить заказ
      </button>
      <div class="space-y-4">
        <FormCheckbox
            class="form__policy"
            name="privacy_policy"
            :label="getPrivacyPolicyLink()"
            v-model="isCheckedPolicy"
        />

        <FormCheckbox
            class="form__oferta"
            name="oferta"
            :label="getOfertaLink()"
            v-model="isCheckedOferta"
        />

        <FormCheckbox
            class="form__marketing"
            name="marketing_consent"
            :label="getMarketingConsentLink()"
            v-model="isCheckedMarketing"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getMarketingConsentLink, getPrivacyPolicyLink, getOfertaLink} from '~/utils/getPolicyLink';


withDefaults(defineProps<{
  isLoading?: boolean
}>(), {
  isLoading: false
})
const emit = defineEmits(['clickToButton']);
const isDisabled = ref(false);

const isCheckedPolicy = ref(false);
const isCheckedOferta = ref(false);
const isCheckedMarketing = ref(false);

watch(isCheckedPolicy, (newValue) => {
  isDisabled.value = newValue;
});
</script>

<style scoped lang="scss">

</style>