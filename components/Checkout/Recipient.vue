<template>
  <div class="checkout__block">
    <div class="checkout__block-title fz-h2">Получатель</div>
    <div class="checkout__user">
      <FormInput
          name="first_name"
          placeholder="Введите имя*"
          v-model="firstName"
      />
      <FormInput
          name="last_name"
          placeholder="Введите фамилию*"
          v-model="lastName"
      />
      <FormPhoneWithCountry
          v-if="countries"
          :countries="countries.countries"
          :default-country-id="0"
          name="phone"
          placeholder="Введите номер телефона*"
          v-model="phone"
          :error="phoneError"
          @country-changed="handleCountryChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {  Country } from "~/types/countries";

// Загружаем страны
const {data: countries} = await useCountries();

const firstName = defineModel('firstName');
const lastName = defineModel('lastName');
const phone = defineModel('phone');

const selectedCountry = ref<Country | null>(null);
const phoneError = ref('');

const handleCountryChange = (country: Country) => {
  selectedCountry.value = country;
};

const setPhoneError = (msg: string) => {
  phoneError.value = msg;
};

// Экспортируем selectedCountry и setPhoneError для валидации в родителе
defineExpose({
  selectedCountry,
  setPhoneError
});
</script>

<style scoped lang="scss">

</style>