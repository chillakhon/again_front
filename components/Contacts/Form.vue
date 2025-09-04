<template>
  <div class="contacts__form form">
    <div class="contacts__form-title fz-h2">Задайте свой вопрос,<br> и мы свяжемся с Вами</div>
    <div class="form__inputs">
      <template v-for="( item, key ) in form" :key="key">
        <component
            v-if="item.template"
            :is="item.template"
            :name="key"
            :placeholder="item.placeholder"
            :error="item.error"
            row-class="_18"
            v-model="item.value"
        />
      </template>
    </div>
    <div class="form__button">
      <button class="contacts__form-btn btn" @click="send">отправить</button>
    </div>
    <FormCheckbox
        class="form__policy"
        name="policy"
        :label="getPolicyLink()"
        :is-checked="true"
    />
  </div>
</template>

<script setup lang="ts">
import {FormInput, FormTextarea, ModalsSuccess} from "#components";

const form = ref( {
  name: {
    template: FormInput,
    value: '',
    placeholder: 'Введите ваше имя',
    error: ''
  },
  email: {
    template: FormInput,
    value: '',
    placeholder: 'Введите вашу email почту',
    error: ''
  },
  phone: {
    template: FormInput,
    value: '',
    placeholder: 'Введите ваш номер телефона',
    error: ''
  },
  theme: {
    template: FormInput,
    value: '',
    placeholder: 'Тема вопроса',
    error: ''
  },
  message: {
    template: FormTextarea,
    value: '',
    placeholder: 'Задайте свой вопрос',
    error: ''
  }
} );

const modal = useModal();

const send = async () => {
  for ( let key in form.value ) {
    form.value[key].error = '';
  }

  const { data, status, error } = await useApi('/contact-requests', {
    body: {
      name: form.value.name.value,
      email: form.value.email.value,
      phone: form.value.phone.value,
      message: form.value.message.value,
    }
  }, 'contact', 'POST' );

  if ( status.value === 'error' && error?.value?.data?.errors ){
    for ( const item in error.value.data.errors ){
      if ( form.value[ item ] ){
        form.value[ item ].error = error.value.data.errors[ item ][0];
      }
    }
  } else {
    modal.openModal( ModalsSuccess, {
      title: 'Спасибо!',
      text: 'Ваша заявка отправлена'
    } )

    for ( let key in form.value ) {
      form.value[key].value = '';
    }
  }
}
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