<template>
  <div class="profile-settings__form form">
    <template v-for="( item, key ) in form" :key="key">
      <component :is="item.template"
        :name="key"
        :placeholder="item.placeholder"
         v-model="item.value"
         :error="item.error"
      />
    </template>
    <div class="form__button">
      <button
          class="profile-settings__form-btn btn _border _loader"
          :class="{ '_loading': isLoading }"
          @click="save"
      >
        Сохранить изменения
      </button>
      <FormCheckbox
          row-class="profile-settings__form-policy"
          name="policy"
          value="1"
          :is-checked="true"
          label="Нажимая на кнопку, вы соглашаетесь<br> с <a href='/policy' target='_blank'>политикой конфиденциальности</a>"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {FormDatepicker, FormInput, ModalsSuccess} from "#components";

definePageMeta({
  layout: 'profile',
  title: 'Контактные данные',
  middleware: ['auth'],
} );

const modal = useModal();
const authStore = useAuthStore();
const { user } = authStore;
const form = ref( {
  first_name: {
    template: FormInput,
    value: '',
    placeholder: 'Имя',
    error: ''
  },
  last_name: {
    template: FormInput,
    value: '',
    placeholder: 'Фамилия',
    error: ''
  },
  birthday: {
    template: FormDatepicker,
    value: '',
    placeholder: 'Дата рождения',
    error: ''
  },
  phone: {
    template: FormInput,
    type: 'tel',
    value: '',
    placeholder: 'Телефон',
    error: ''
  },
  email: {
    template: FormInput,
    value: '',
    type: 'email',
    placeholder: 'E-mail',
    error: ''
  },
} );

onMounted( () => {
  form.value.first_name.value = user?.profile?.first_name || '';
  form.value.last_name.value = user?.profile?.last_name || '';
  form.value.birthday.value = user?.profile?.birthday || '';
  form.value.phone.value = user?.profile?.phone || '';
  form.value.email.value = user.email;
} );
//
const isLoading = ref( false );

const save = async () => {
  for ( let key in form.value ) {
    form.value[key].error = '';
  }

  isLoading.value = true;
  const { data, status, error } = await useApi('/clients/update-profile', {
    body: {
      first_name: form.value.first_name.value,
      last_name: form.value.last_name.value,
      phone: form.value.phone.value,
      email: form.value.email.value,
      birthday: form.value.birthday.value
    }
  }, '', 'PUT');

  if ( status.value === 'error' && error?.value?.data?.errors ){
    for ( const item in error.value.data.errors ){
      if ( form.value[ item ] ){
        form.value[ item ].error = error.value.data.errors[ item ][0];
      }
    }
  } else {
    modal.openModal( ModalsSuccess, {
      title: 'Спасибо!',
      text: 'Ваш профиль обновлен'
    } )
  }

  isLoading.value = false;
}
</script>

<style scoped lang="scss">
.profile-settings__form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.2rem;

  & .form__button {
    margin-top: 0;

    @media (max-width: $mobile) {
      & .btn {
        min-height: 5rem;
      }
    }
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
  }
}

.profile-settings__form-btn {
  width: 100%;
}

.profile-settings__form-policy {
  margin-top: 2rem;
}

</style>