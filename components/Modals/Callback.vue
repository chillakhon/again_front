<template>
  <div class="modal-callback__title modal__title">Перезвоним<br> вам в&nbsp;течение нескольких минут</div>
  <div class="modal-callback__form form">
    <template v-for="( item, key ) in form" :key="key">
      <component
        :is="item.template"
        :type="item.type"
        :name="key"
        :placeholder="item.placeholder"
        :error="item.error"
        v-model="item.value"
        row-class="_15"
      />
    </template>
    <div class="form__button">
      <button
          class="modal-callback__btn btn _loader _wide"
          @click="send"
          :disabled="isButtonDisabled"
      >Оставить заявку</button>
    </div>

    <FormCheckbox
        class="form__policy"
        name="policy"
        :label="getPolicyLink()"
        v-model="isChecked"
    />
  </div>
</template>

<script setup lang="ts">
import {FormInput, FormTextarea, ModalsSuccess} from "#components";
import {useFormValidator} from "~/composables/useFormValidator";

const form = ref( {
  name: {
    template: FormInput,
    value: '',
    placeholder: 'Введите ваше имя',
    error: ''
  },
  phone: {
    template: FormInput,
    type: 'tel',
    name: 'phone',
    placeholder: 'Введите номер телефона*',
    value: '',
    error: '',
    validation: {
      required: true
    }
  },
  email: {
    template: FormInput,
    value: '',
    placeholder: 'Введите вашу email почту',
    error: ''
  },
  message: {
    template: FormTextarea,
    value: '',
    placeholder: 'Задайте свой вопрос',
    error: ''
  }
} );

const isChecked = ref( true );
const isButtonDisabled = ref( false );

watch( ( isChecked ), ( oldValue, newValue ) => {
  isButtonDisabled.value = newValue;
} )

const modal = useModal();

const send = async () => {
  const { isFormError, validateForm, resetErrors, resetForm } = useFormValidator( form );
  resetErrors();
  validateForm();

  if ( isFormError.value ) {
    return;
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

    resetErrors();
    resetForm();
  }
}
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
  font-size: 4rem;
  line-height: 100%;
}
</style>