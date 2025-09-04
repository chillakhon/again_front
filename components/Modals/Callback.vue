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
      <button class="modal-callback__btn btn _loader _wide" @click="send">Оставить заявку</button>
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
import {FormInput, ModalsSuccess} from "#components";

const form = ref( {
  phone: {
    template: FormInput,
    type: 'tel',
    name: 'phone',
    placeholder: 'Введите номер телефона*',
    value: '',
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
      phone: form.value.phone.value
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