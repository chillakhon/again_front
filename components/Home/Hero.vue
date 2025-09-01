<template>
  <section class="hero">
    <div class="hero__container container">
      <swiper-container
          class="hero__slider"
          slides-per-view="1"
          space-between="5"
          :loop="true"
          :pagination="{
            //hideOnClick: true
            el: '.hero__dots',
            clickable: true,
          }"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <HeroSlide
            :title="slide.title"
            :subtitle="slide.subtitle"
            :text="slide.text"
            :image="{
              original: slide?.image_urls?.original,
              sm: slide?.image_urls?.sm
            }"
          />
        </swiper-slide>
      </swiper-container>

      <div class="hero__dots swiper__dots"></div>
    </div>
  </section>

</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
register();

type Slide = {
  title: string,
  subtitle: string,
  text: string,
  image_urls: {
    original: string,
    sm?: string
  }
}

const { data: slides } = await useApi<Slide[]>( '/get_slides' );
</script>

<style scoped lang="scss">
.hero {
  padding: 2.364rem 0 5.7rem;

  @media (max-width: $mobile) {
    padding-bottom: 1.6rem;
  }
}

.hero__dots, swiper-container::part(pagination) {
  margin-top: 3rem;
  position: relative;
  z-index: 15;

  @media (max-width: $mobile) {
    margin-top: 1.8rem;
  }
}

</style>