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
      <button class="checkout__btn btn" @click="emit( 'clickToButton' )">Подтвердить заказ</button>
      <FormCheckbox
        name="policy"
        class="checkout__policy"
        value="1"
        label="Нажимая на кнопку, вы соглашаетесь<br> с политикой конфиденциальности"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['clickToButton']);
</script>

<style scoped lang="scss">

</style>