<template>
  <div class="contacts__form form">
    <div class="contacts__form-title fz-h2">Задайте свой вопрос,<br> и мы свяжемся с Вами</div>
    <div class="form__inputs">
      <FormInput
          name="name"
          placeholder="Введите ваше имя"
          row-class="_18"
          :is-light="true"
          v-model="form.name"
      />
      <FormInput
          name="email"
          placeholder="Введите вашу email почту"
          row-class="_18"
          :is-light="true"
          :value="form.email"
          v-model="form.email"
      />
      <FormInput
          name="phone"
          placeholder="Введите ваш номер телефона"
          row-class="_18"
          :is-light="true"
          :value="form.phone"
          v-model="form.phone"
      />
      <FormInput
          name="theme"
          placeholder="Тема вопроса"
          row-class="_18"
          :is-light="true"
          :value="form.theme"
          v-model="form.theme"
      />
      <FormTextarea
          name="message"
          placeholder="Задайте свой вопрос"
          v-model="form.message"
          class="_18"
      />
    </div>
    <div class="form__button">
      <button class="contacts__form-btn btn">отправить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref( {
  name: "",
  email: "",
  phone: "",
  theme: "",
  message: "",
  policy: "1",
} )
</script>

<style scoped lang="scss">
.contacts__form {
  max-width: 56.6rem;
  padding: 4.9rem 6.9rem 4.3rem 7.1rem;
  background: rgba(237, 234, 232, 5);
  border-radius: 4.2rem;

  @media (max-width: $tablet) {
    margin-top: 3rem;
  }

  @media (max-width: $mobile) {
    padding: 2.7rem 1rem 4.3rem;
    border-radius: 2rem;
    width: 100%;
    max-width: 100%;

    & .form__button {
      margin-top: 1.5rem;
    }
  }
}

.contacts__form-title {
  text-align: center;
  margin-bottom: 2.8rem;
}

.contacts__content {
  @media (max-width: $mobile) {
    width: 100%;
  }
}
</style>