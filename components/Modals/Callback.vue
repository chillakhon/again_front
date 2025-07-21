<template>
  <div class="modal-callback__title modal__title">Перезвоним<br> вам в&nbsp;течение нескольких минут</div>
  <div class="modal-callback__form form">
    <FormInput
        row-class="_15"
        type="tel"
        name="phone"
        placeholder="Введите номер телефона*"
    />
    <div class="form__button">
      <button class="modal-callback__btn btn _wide">Оставить заявку</button>
    </div>

    <FormCheckbox
        class="form__policy"
        name="policy"
        label="Нажимая на кнопку, вы соглашаетесь<br> с политикой конфиденциальности"
    />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.modal-callback {
  &__title {
    margin-bottom: 1.9rem;

    @media (max-width: $tablet) {
      max-width: 30rem;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__form {
    max-width: 36.7rem;
    margin: 0 auto;

    & .form__button {
      margin-top: 0;
    }
  }
}
.modal-callback__title {
  margin-bottom: 1.9rem;
}
</style>