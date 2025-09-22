<template>
  <section class="videos">
    <ClientOnly>
      <swiper-container
          class="videos__swiper swiper"
          :slidesPerView="2.2"
          :spaceBetween="10"
          :pagination="{
            clickable: true
          }"
          :modules="[Pagination, Autoplay]"
          :autoplay="{
              delay: 7000
            }"
          :breakpoints="{
            0: {
              slidesPerView: 2.2,
              spaceBetween: 10,
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
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";

register();
</script>

<style scoped lang="scss">
.videos {
  padding-bottom: 9rem;

  @media (max-width: $mobile) {
    padding-bottom: 5rem;
  }
}

swiper-container::part(pagination) {
  margin-top: 2rem;
}

.videos__dots {
  margin-top: 2rem;
  display: none;

  @media (max-width: $mobile) {
    display: flex;
  }
}

</style>