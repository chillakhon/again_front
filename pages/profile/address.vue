<template>
  <div class="profile-address__form form">
    <div class="profile-address__form-grid">
      <FormSelect
          v-if="countries"
          name="country"
          :list="countries.countries"
          placeholder="Страна"
          v-model="form.country"
      />
      <FormInput
          name="index"
          placeholder="Индекс"
          v-model="form.index"
      />
      <FormSelect
          v-if="cities"
          name="country"
          :list="cities.cities"
          placeholder="Город"
          v-model="form.city"
      />
      <FormInput
          name="house"
          placeholder="Улица, дом"
          v-model="form.house"
      />
    </div>
    <div class="profile-address__form-actions">
      <button class="profile-address__form-btn btn _border">Сохранить изменения</button>
      <button class="profile-address__form-reset">Сбросить данные</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Cities, Countries} from "~/types/countries";

definePageMeta({
  layout: 'profile',
  title: 'Адрес доставки',
  middleware: 'auth'
})

const { data: countries } = await useApi<Countries>( '/countries' );
const { data: cities } = await useApi<Cities>( '/countries/cities' );

const form = ref( {
  country: '',
  index: '',
  city: '',
  house: '',
} )
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