<template>
  <div class="profile-address__form form">
    <div class="profile-address__form-grid">
      <template v-for="( item, key ) in form">
        <component
          :is="item.template"
          :name="key"
          v-model="item.value"
          :error="item.error"
          :placeholder="item.placeholder"
          :list="item.list"
        />
      </template>
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
})

const form = ref( {
  delivery_country_id: {
    template: FormSelect,
    list: [],
    placeholder: 'Страна',
    name: 'county',
    value: '',
    error: ''
  },
  delivery_postal_code: {
    template: FormInput,
    name: 'index',
    placeholder: 'Индекс',
    value: '',
    error: ''
  },
  delivery_city_id: {
    template: FormSelect,
    list: [],
    placeholder: 'Город',
    name: 'delivery_city_id',
    value: '',
    error: ''
  },
  delivery_address: {
    template: FormInput,
    name: 'house',
    placeholder: 'Улица, дом',
    value: '',
    error: ''
  },
} );

const authStore = useAuthStore();
const { user } = authStore;
const modal = useModal();
const isLoading = ref( false );

onMounted( async () => {
  const {data: countries} = await useApi<Countries>('/countries');
  const {data: cities} = await useApi<Cities>('/countries/cities');

  console.log(countries.value);
  // form.value.delivery_country_id.value = user?.profile?.delivery_country_id || 0;
  // form.value.delivery_country_id.list = countries.value?.countries;
  // form.value.delivery_postal_code.value = user?.profile?.delivery_postal_code || '';
  // form.value.delivery_city_id.value = user?.profile?.delivery_city_id || 0;
  // form.value.delivery_city_id.list = cities.value?.cities;
  // form.value.delivery_address.value = user?.profile?.delivery_address || '';
} );

const save = async () => {
  for (let key in form.value) {
    form.value[key].error = '';
  }

  isLoading.value = true;
  const {data, status, error} = await useApi('/clients/update-delivery-address', {
    body: {
      delivery_country_id: form.value.delivery_country_id.value,
      delivery_postal_code: form.value.delivery_postal_code.value,
      delivery_city_id: form.value.delivery_city_id.value,
      delivery_address: form.value.delivery_address.value
    }
  }, '', 'PUT');

  if (status.value === 'error' && error?.value?.data?.errors) {
    for (const item in error.value.data.errors) {
      if (form.value[item]) {
        form.value[item].error = error.value.data.errors[item][0];
      }
    }
  } else {
    modal.openModal(ModalsSuccess, {
      title: 'Спасибо!',
      text: 'Ваш профиль обновлен'
    })
  }

  isLoading.value = false;
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