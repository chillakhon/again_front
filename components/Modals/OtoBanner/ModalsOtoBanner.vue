<template>
  <div class="modal-oto">
    <div class="modal-oto__image" v-if="banner?.image">
      <img :src="banner.image.url" :alt="banner.name">
    </div>

    <div class="modal-oto__content">
      <div class="modal-oto__title modal__title" v-if="banner?.title" v-html="banner.title"></div>
      <div class="modal-oto__subtitle" v-if="banner?.subtitle" v-html="banner.subtitle"></div>

      <div class="modal-oto__form form">

        <template v-if="banner?.input_field_enabled">
          <component
              :is="getInputComponent()"
              :type="getInputType()"
              name="input_field_value"
              :placeholder="banner?.input_field_placeholder || banner?.input_field_label || 'Введите данные'"
              :error="form.input_field_value.error"
              v-model="form.input_field_value.value"
              row-class="_15"
          />

        </template>

        <div class="form__button" v-if="banner?.button_enabled">
          <button
              class="modal-oto__btn btn _loader _wide"
              @click="send"
              :disabled="isButtonDisabled"
              :class="{ '_loading': isLoading }"
          >
            {{ banner?.button_text || 'Отправить' }}
          </button>
        </div>

        <FormCheckbox
            class="form__policy"
            name="policy"
            :label="getPolicyLink()"
            v-model="isChecked"
        />
      </div>

      <div class="modal-oto__privacy" v-if="banner?.privacy_text" v-html="banner.privacy_text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {FormInput, FormPhone} from "#components"
import {useFormValidator} from "~/composables/useFormValidator"
import type {OtoBanner} from "~/types/oto-banner/otoBanner"

// Получаем props из modal store
const modalStore = useModal()
const banner = computed(() => modalStore.props.banner as OtoBanner)

const form = ref({
  input_field_value: {
    value: '',
    error: '',
    validation: {
      required: banner?.value.input_field_required || false
    }
  }
})

const isChecked = ref(false)
const isButtonDisabled = ref(true)
const isLoading = ref(false)

watch(isChecked, (oldValue, newValue) => {
  isButtonDisabled.value = newValue
})

const {submitOtoBanner} = useOtoBanner()

const send = async () => {
  const {isFormError, validateForm, resetErrors, resetForm} = useFormValidator(form)
  resetErrors()
  validateForm()

  if (isFormError.value) {
    return
  }

  isLoading.value = true

  const inputValue = form.value.input_field_value.value

  const data = {
    input_field_value: inputValue,
    email: getInputType() == 'email' ? inputValue : null,
    phone: getInputType() == 'tel' ? inputValue : null,
  }


  const result = await submitOtoBanner(data)

  isLoading.value = false

  if (result.success) {
    resetErrors()
    resetForm()
  } else if (result.error?.data?.errors) {
    for (const item in result.error.data.errors) {
      if (form.value[item]) {
        form.value[item].error = result.error.data.errors[item][0]
      }
    }
  }
}

/**
 * Определить компонент для поля ввода
 */
const getInputComponent = () => {
  if (banner?.value.input_field_type === 'phone') {
    return FormPhone
  }
  return FormInput
}

/**
 * Определить тип input
 */
const getInputType = () => {
  const type = banner?.value.input_field_type
  if (type === 'email') return 'email'
  if (type === 'phone') return 'tel'
  return 'text'
}
</script>

<style scoped lang="scss">
.modal-oto {
  max-width: 80rem;

  @media (max-width: $tablet) {
    max-width: 60rem;
  }

  @media (max-width: $mobile) {
    max-width: 100%;
  }
}

.modal-oto__image {
  width: 100%;
  margin-bottom: 2rem;
  border-radius: .8rem;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: $mobile) {
    margin-bottom: 1.5rem;
  }
}

.modal-oto__content {
  text-align: center;
}

.modal-oto__title {
  margin-bottom: 1rem;
  font-size: 3.2rem;
  line-height: 110%;
  font-weight: 700;

  @media (max-width: $tablet) {
    font-size: 2.8rem;
  }

  @media (max-width: $mobile) {
    font-size: 2.4rem;
    margin-bottom: 0.8rem;
  }
}

.modal-oto__subtitle {
  margin-bottom: 2rem;
  font-size: 1.8rem;
  line-height: 140%;
  color: var(--fg-gray);

  @media (max-width: $tablet) {
    font-size: 1.6rem;
  }

  @media (max-width: $mobile) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
}

.modal-oto__form {
  max-width: 42rem;
  margin: 0 auto;

  & .form__button {
    margin-top: 0;
  }

  @media (max-width: $mobile) {
    max-width: 100%;
  }
}

.modal-oto__privacy {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  @media (max-width: $mobile) {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
}
</style>