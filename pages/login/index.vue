<template>
  <div class="login">
    <div class="login__container container">
      <div class="login__left">
        <Breadcrumbs />
        <div class="block__header login-block__header">
          <h1 class="block__header-title">Вход в кабинет покупателя</h1>
        </div>
        <div class="login__form login-form">
          <div class="login-form__input">
            <FormInput
                name="email"
                placeholder="Введите вашу email почту"
                row-class="login-form__row"
                v-model="loginForm.email"
                :value="loginForm.email"
            />
          </div>
          <div class="login-form__input" v-if="auth.isCodeActive">
            <FormInput
                name="code"
                placeholder="Введите код"
                row-class="login-form__row"
                v-model="loginForm.verification_code"
                :value="loginForm.verification_code"
            />
          </div>
          <button
              v-if="auth.isCodeActive"
              class="login-form__button btn"
              @click="auth.login( loginForm.email, loginForm.verification_code )"
          >
            Войти или зарегистрироваться
          </button>
          <button v-else class="login-form__button btn" @click="auth.sendCode( loginForm.email )">
            Отправить код
          </button>
        </div>
      </div>
      <div class="login__media">
        <picture class="login__media-pic">
          <source media="(max-width: 600px)" data-srcset="./img/login.again/main-mobile.jpg" srcset="/img/login.again/main-mobile.jpg">
          <source media="(min-width: 601px)" data-srcset="./img/login.again/main.jpg" srcset="/img/login.again/main.jpg">
          <img src="/img/login.again/main.jpg" class="login__media-img" alt="">
        </picture>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Адрес доставки',
  middleware: 'not-auth'
})

const loginForm = ref( {
  email: '',
  verification_code: '',
} );

const auth = useAuthStore();
// if ( auth.isAuthenticated ){
//   navigateTo('/profile/settings');
// }

</script>

<style scoped lang="scss">
.login-block__header {
  margin-bottom: 2.5rem;
  max-width: 46.2rem;

  & .block__header-title {
    text-align: left;
    color: var(--fg-black)
  }
}

.login {
  padding: 2.2rem 0 0;

  @media (max-width: $mobile) {
    padding-bottom: 4.5rem;
  }
}

.login__container {
  display: flex;
  justify-content: space-between;

  @media (max-width: $tablet) {
    flex-direction: column;
  }
}

.login-form__input {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: $mobile) {
    flex-wrap: wrap;
  }
}

.login-form__row {
  max-width: 36.7rem;
  width: 36.7rem;
  margin-bottom: 0;
}

.login-form__code {
  margin-left: 1.7rem;
  font-size: 1.6rem;
  text-decoration: underline;
  border: none;
  background: none;
  color: var(--fg-red);

  @media (max-width: $mobile) {
    font-size: 1.4rem;
    margin-top: 1.1rem;
    margin-left: 0;
  }
}

.login-form__button {
  max-width: 36.7rem;
  margin: 2rem 0 0;

  @media (max-width: $mobile) {
    min-height: 5rem;
  }
}

.login__media {
  min-width: 56.6rem;

  @media (max-width: $tablet) {
    margin-top: 3rem;
    min-width: auto;
  }
}

.login__media-pic {
  min-height: 63.1rem;
  position: relative;

  @media (max-width: $mobile) {
    min-height: auto;
  }
}

.login__media-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
  border-radius: 3rem 3rem 0 0;

  @media (max-width: $mobile) {
    position: relative;
    width: auto;
    height: auto;
  }
}

</style>