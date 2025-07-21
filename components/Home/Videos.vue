<script setup lang="ts">
import { register } from 'swiper/element/bundle';
register();
</script>

<template>
  <section class="videos">
    <swiper-container
        class="videos__swiper swiper"
        :breakpoints="{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
              el: '.videos__dots',
              clickable: true
            },
          },
          600: {
            slidesPerView: 3.5,
            spaceBetween: 10,
            pagination: false
          },
          992: {
            slidesPerView: 7.4,
            spaceBetween: 10,
          }
        }"
    >
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
        <swiper-slide>
          <VideosCard />
        </swiper-slide>
    </swiper-container>
    <div class="videos__dots swiper__dots"></div>
  </section>
</template>

<style scoped lang="scss">
.videos {
  padding-bottom: 9rem;

  @media (max-width: $mobile) {
    padding-bottom: 5rem;
  }
}

.videos__dots {
  margin-top: 2rem;
  display: none;

  @media (max-width: $mobile) {
    display: flex;
  }
}

</style>