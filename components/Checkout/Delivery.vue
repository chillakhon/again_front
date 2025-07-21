<template>
  <div class="checkout__block">
    <div class="checkout__block-title fz-h2">Доставка</div>
    <div class="checkout__delivery">
      <FormInput
          name="country"
          placeholder="Страна*"
          v-model="countryCode"
      />
      <FormInput
          name="city"
          placeholder="Населенный пункт*"
          v-model="cityName"
      />
      <FormInput
          name="address"
          placeholder="Адрес*"
          v-model="address"
      />


      <FormCheckbox
          name="delivery[]"
          class="form__row"
          :label="{
            title: 'Пункт выдачи СДЭК',
            link: 'Выбрать на карте',
            price: '+ __ ₽'
          }"
      />

      <FormCheckbox
          name="delivery[]"
          class="form__row"
          :label="{
            title: 'Пункт самовывоза Boxberry',
            link: 'Выбрать на карте',
            price: '+ __ ₽'
          }"
      />

      <FormCheckbox
          name="delivery[]"
          class="form__row"
          :label="{
            title: 'Доставка в отделение Почты<br> России или почтомат',
            link: 'Выбрать на карте',
            price: '+ __ ₽'
          }"
      />

      <FormCheckbox
          name="delivery[]"
          class="form__row"
          :label="{
            title: 'СДЭК: Курьерская доставка',
            link: 'Тариф “Посылка склад-дверь”<br> от 6 до 7 рабочих дней',
            price: '+ __ ₽'
          }"
      />

      <FormCheckbox
          name="delivery[]"
          class="form__row"
          :label="{
            title: 'Курьером Boxberry',
            link: 'Курьерская служба<br> Boxberry 7 дней',
            price: '+ __ ₽'
          }"
      />
    </div>
    <div class="checkout__delivery-comment">
      <FormTextarea name="notes" placeholder="Оставьте комментарий к заказу" v-model="notes" />
    </div>
  </div>
</template>

<script setup lang="ts">
const countryCode = defineModel( 'countryCode' );
const cityName = defineModel( 'cityName' );
const address = defineModel( 'address' );
const notes = defineModel( 'notes' );
</script>

<style scoped lang="scss">
.delivery__checkbox {
  :deep(.checkbox__icon) {
    top: .2rem;

    @media (max-width: $mobile) {
      font-size: .3rem;
    }
  }

  @media (max-width: $mobile) {
    & {
      margin-top: 3rem;
      margin-bottom: 0;
    }
  }
}

.checkout__delivery-comment {
  margin-top: 3.3rem;
}

</style>