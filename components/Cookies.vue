<template>
  <div class="cookie" v-show="useCookie.isShow">
    <div class="cookie__content">
      <div class="cookie__title">Куки</div>
      <div class="cookie__text">
        «ООО ЭГЕЙН» использует файлы cookie. Полная информация в правилах по обработке <a href="#">Персональных данных</a>.<br>
        Вы можете запретить сохранение cookie в настройках своего браузера
      </div>
    </div>
    <button class="cookie__btn btn" @click="useCookie.submit">
      Принять
    </button>
  </div>
</template>

<script setup lang="ts">
const useCookie = useCookieStore();
</script>

<style scoped lang="scss">
.cookie {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: var(--w-container);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--fg-white);
  border-radius: 1rem;
  border: 1px solid var(--fg-input-border);
  padding: 2rem 5rem;

  &__btn {
    font-size: 1.2rem;
    width: auto;
    padding: .8rem 3rem;
    min-height: auto;
    margin: 0;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: .5rem;
  }

  &__text {
    font-size: 1.4rem;

    & a {
      color: var(--fg-red);
      text-decoration: underline;
    }
  }
}
</style>