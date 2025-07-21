<template>
  <section class="hero">
    <div class="hero__container container">
      <swiper-container
          class="hero__slider"
          slides-per-view="1"
          space-between="5"
          :pagination="{
            //hideOnClick: true
            el: '.hero__dots',
            clickable: true,
          }"
      >
        <swiper-slide>
          <HeroSlide />
        </swiper-slide>
        <swiper-slide>
          <HeroSlide />
        </swiper-slide>
        <swiper-slide>
          <HeroSlide />
        </swiper-slide>
      </swiper-container>

      <div class="hero__dots swiper__dots"></div>
    </div>
  </section>

</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
register();

</script>

<style scoped lang="scss">
.hero {
  padding: 2.364rem 0 5.7rem;

  @media (max-width: $mobile) {
    padding-bottom: 1.6rem;
  }
}

.hero__dots {
  margin-top: 3rem;
  position: relative;
  z-index: 15;

  @media (max-width: $mobile) {
    margin-top: 1.8rem;
  }
}

</style>