<template>
  <ul class="menu">
    <li class="menu__item"><NuxtLink to="/" class="menu__link">Главная</NuxtLink></li>
    <li class="menu__item"><NuxtLink to="/catalog" class="menu__link">Каталог</NuxtLink></li>
    <li class="menu__item menu__item--children">
      <a href="#" class="menu__link">
        Информация для клиентов
        <span class="menu__link-icon">
              <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M5 5L9.33013 0.5H0.669873L5 5Z" fill="#545454"/>
              </svg>
            </span>
      </a>
      <ul class="menu__sub">
        <li class="menu__item"><NuxtLink to="/delivery" class="menu__link">Доставка и оплата</NuxtLink></li>
        <li class="menu__item"><NuxtLink to="/returns" class="menu__link">Обмен и возврат</NuxtLink></li>
        <li class="menu__item"><NuxtLink to="/care" class="menu__link">Уход и использование</NuxtLink></li>
        <li class="menu__item"><NuxtLink to="/sertificates" class="menu__link">Сертификаты</NuxtLink></li>
        <li class="menu__item"><NuxtLink to="#" class="menu__link">Подбор по впитываемости и по размеру</NuxtLink></li>
      </ul>
    </li>
    <li class="menu__item"><NuxtLink to="/faq" class="menu__link">Отвечаем на ваши вопросы</NuxtLink></li>
    <li class="menu__item"><NuxtLink to="/articles" class="menu__link">Полезное</NuxtLink></li>
    <li class="menu__item"><NuxtLink to="/contacts" class="menu__link">Контакты</NuxtLink></li>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item {
  position: relative;

  &:hover {
    & > .menu__link {
      color: rgba(203, 11, 19, .8);

      & .menu__link-icon path {
        fill: rgba(203, 11, 19, .8);;
      }
    }
  }

  @media (max-width: $tablet) {
    width: 100%;
  }
}

@media (any-hover: hover) {
  .menu__item--children:hover {
    & .menu__sub {
      transform: translateX(0);
      opacity: 1;
      z-index: 998;
      pointer-events: auto;
    }
  }
}

@media (max-width: $tablet) {
  .menu__item--children._active {
    & .menu__sub {
      grid-template-rows: 1fr;
      height: auto;
      opacity: 1;
      padding-top: 2.3rem;
      pointer-events: auto;
    }
  }
}

.menu__link {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  line-height: 110%;
  color: var(--fg-regular-85);
  font-weight: 300;
}

.menu__link-icon {
  margin-left: .4rem;

  & path {
    transition: var(--tr-regular);
  }

  @media (max-width: $tablet) {
    position: absolute;
    right: 0;
    top: 1rem;
  }
}

.menu__sub {
  position: absolute;
  left: 0;
  padding: 1.9rem 1.8rem 2.3rem;
  border-radius: var(--br-regular);
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.1), 0 28px 28px 0 rgba(0, 0, 0, 0.09), 0 63px 38px 0 rgba(0, 0, 0, 0.05), 0 112px 45px 0 rgba(0, 0, 0, 0.01), 0 175px 49px 0 rgba(0, 0, 0, 0);
  z-index: -1;
  white-space: nowrap;
  background: var(--fg-white);
  transform: translateX(-100%);
  opacity: 0;
  transition: var(--tr-regular);
  pointer-events: none;

  & .menu__item {
    margin-bottom: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: $tablet) {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    opacity: 0;
    z-index: 1;
    grid-template-rows: 0;
    height: 0;
    transition: all 0.4s;
    overflow: hidden;
    box-shadow: none;
    padding: 0 0 0 2.2rem;
    border-radius: 0;
  }
}

</style>