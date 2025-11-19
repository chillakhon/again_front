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
      <FormCheckbox
        name="policy"
        class="checkout__policy"
        value="1"
        :is-checked="true"
        :label="getPolicyLink()"
        v-model="isChecked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults( defineProps<{
  isLoading?: boolean
}>(), {
  isLoading: false
} )
const emit = defineEmits(['clickToButton']);
const isDisabled = ref( false );
const isChecked = ref( false );

watch( isChecked, ( isChecked: boolean, newValue: boolean ) => {
  isDisabled.value = newValue;
} )
</script>

<style scoped lang="scss">

</style>