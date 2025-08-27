<template>
  <div class="profile-address__form form">
    <div class="profile-address__form-grid">
      <FormSelect
        v-if="countries"
        v-model="form.delivery_country_id.value"
        :error="form.delivery_country_id.error"
        :list="countries.countries"
        placeholder="Выбрать страну"
      />
      <FormInput
          placeholder="Индекс"
          v-model="form.delivery_postal_code.value"
          :error="form.delivery_postal_code.error"
      />
      <FormSelect
          v-if="cities"
          v-model="form.delivery_city_id.value"
          :error="form.delivery_city_id.error"
          :list="cities.cities"
          placeholder="Выбрать город"
      />
      <FormInput
          placeholder="Улица, дом"
          v-model="form.delivery_address.value"
          :error="form.delivery_address.error"
      />
    </div>
    <div class="profile-address__form-actions">
      <button
          class="profile-address__form-btn btn _border"
          :class="{ '_loading': isLoading }"
          @click="save"
      >Сохранить изменения</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Cities, Countries} from "~/types/countries";
import {FormInput, FormSelect, ModalsSuccess} from "#components";

definePageMeta({
  layout: 'profile',
  title: 'Адрес доставки'
});

const { data: countries } = await useApi<Countries>('/countries');
const { data: cities } = await useApi<Cities>('/countries/cities');

const authStore = useAuthStore();
const { user } = authStore;
const modal = useModal();
const isLoading = ref( false );

const form = ref( {
  delivery_country_id: {
    value: '',
    error: '',
  },
  delivery_postal_code: {
    value: '',
    error: ''
  },
  delivery_city_id: {
    value: '',
    error: '',
  },
  delivery_address: {
    value: '',
    error: ''
  },
} );

const save = () => {

}
</script>

<style scoped lang="scss">
.profile-address__form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 75.6rem;
  column-gap: 2.2rem;
  row-gap: 1.5rem;

  & .form__row {
    margin-bottom: 0;
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    column-gap: 1.5rem;
  }
}

.profile-address__form-actions {
  display: flex;
  align-items: center;
  margin-top: 3.2rem;

  @media (max-width: $mobile) {
    margin-top: 2rem;
    flex-direction: column;
  }
}

.profile-address__form-btn {
  margin: 0;
}

.profile-address__form-reset {
  margin-left: 1.6rem;
  opacity: .5;
  text-decoration: underline;
  color: var(--fg-gray-3);

  @media (max-width: $mobile) {
    margin-left: 0;
    margin-top: 1.2rem;
  }
}

</style>