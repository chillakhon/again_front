<template>
  <div class="profile-address__form form">
    <div class="profile-address__form-grid">
      <FormInput
        name="country"
        placeholder="Страна"
      />
      <FormInput
          name="index"
          placeholder="Индекс"
      />
      <FormInput
          name="city"
          placeholder="Город"
      />
      <FormInput
          name="house"
          placeholder="Улица, дом"
      />
    </div>
    <div class="profile-address__form-actions">
      <button class="profile-address__form-btn btn _border">Сохранить изменения</button>
      <button class="profile-address__form-reset">Сбросить данные</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  title: 'Адрес доставки',
  middleware: 'auth'
})
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