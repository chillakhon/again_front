<template>
  <div class="profile-sales__item">
    <div class="profile-sales__item-media">
      <picture class="profile-sales__item-pic">
        <img src="/img/profile.again/sales/item-1.jpg" class="profile-sales__item-img" alt="">
      </picture>
    </div>
    <div class="profile-sales__item-title">Заголовок скидки/бонуса</div>
    <div class="profile-sales__item-text">Описание текста акции Описание текста акции Описание текста акции</div>
    <div class="profile-sales__item-alert">Скидка 25% на первый заказ</div>
    <button class="profile-sales__item-btn btn _border _thin">Применить</button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.profile-sales__item {
  max-width: 26.9rem;

  @media (max-width: $mobile) {
    max-width: 100%;
  }
}

.profile-sales__item-media {
  margin-bottom: 1.6rem;
}

.profile-sales__item-pic {
  min-height: 30rem;
  position: relative;

  @media (max-width: $mobile) {
    min-height: 27.4rem;
  }
}

.profile-sales__item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: var(--br-regular);
}

.profile-sales__item-title {
  font-size: 1.8rem;
  line-height: 100%;
  font-weight: 300;
  margin-bottom: .5rem;

  @media (max-width: $mobile) {
    font-size: 1.6rem;
  }
}

.profile-sales__item-text {
  max-width: 23.5rem;
  font-size: 1.3rem;
  line-height: 140%;
  opacity: .5;
  margin-bottom: 1.3rem;

  @media (max-width: $mobile) {
    font-size: 1.2rem;
  }
}

.profile-sales__item-alert {
  font-weight: 700;
  color: var(--fg-red);
  line-height: 100%;
}

.profile-sales__item-btn {
  width: 100%;
  margin-top: 2.3rem;

  @media (max-width: $mobile) {
    margin-top: 2rem;
    text-transform: uppercase !important;
  }
}

</style>