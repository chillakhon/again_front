<template>
  <div class="profile-settings__form form">

    <FormInput
        name="first_name"
        placeholder="Имя"
        v-model="userForm.first_name"
        :value="userForm.first_name"
    />
    <FormInput
        name="last_name"
        placeholder="Фамилия"
        v-model="userForm.last_name"
        :value="userForm.last_name"
    />
    <FormInput
        name="surname"
        placeholder="Отчество"
        v-model="userForm.surname"
        :value="userForm.surname"
    />
    <FormInput
        name="phone"
        placeholder="Телефон"
        v-model="userForm.phone"
        :value="userForm.phone"
    />
    <FormInput
        name="email"
        placeholder="Почта"
        v-model="userForm.email"
        :value="userForm.email"
    />
    <div class="form__button">
      <button
          class="profile-settings__form-btn btn _border"
          @click="save"
      >
        Сохранить изменения
      </button>
      <FormCheckbox
          row-class="profile-settings__form-policy"
          name="policy"
          value="1"
          :is-checked="true"
          label="Нажимая на кнопку, вы соглашаетесь<br> с политикой конфиденциальности"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  title: 'Контактные данные',
} );

const authStore = useAuthStore();
const { user } = authStore;
const userForm = ref( {
  first_name: '',
  last_name: '',
  surname: '',
  phone: '',
  email: '',
} );

onMounted( () => {
  userForm.value.first_name = user.profile.first_name;
  userForm.value.last_name = user.profile.last_name;
  userForm.value.surname = user.profile.surname;
  userForm.value.phone = user.profile.phone;
  userForm.value.email = user.email;
} )

const save = async () => {
  const { data } = await useApi('/clients/update-profile', {
    body: userForm.value
  }, '', 'PUT')
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