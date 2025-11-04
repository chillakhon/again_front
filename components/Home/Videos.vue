<template>
  <section class="videos">
    <ClientOnly>
      <swiper-container
          class="videos__swiper swiper"
          :slidesPerView="2.2"
          :spaceBetween="10"
          :pagination="{ clickable: true }"
          :modules="[Pagination, Autoplay]"
          :autoplay="{ delay: 7000 }"
          :breakpoints="{
            0: { slidesPerView: 2.2, spaceBetween: 10 },
            600: { slidesPerView: 3.5, spaceBetween: 10, pagination: false },
            992: { slidesPerView: 7.4, spaceBetween: 10 }
          }"
      >
        <!-- v-for: передаём ссылку в каждый VideosCard -->
        <swiper-slide v-for="(item, idx) in videos" :key="item.id ?? idx">
          <VideosCard
              :link="item.url"
              :id="item.id"
          />
        </swiper-slide>
      </swiper-container>
      <div class="videos__dots swiper__dots"></div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {register} from 'swiper/element/bundle';
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";

register();

const videos = ref([

  {
    id: 10,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-05-38%20(2).mov'
  },
  {
    id: 1,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2009-01-44.mov'
  },
  {
    id: 2,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-10-02.mov'
  },
  {
    id: 3,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-11-31.mov'
  },
  {
    id: 4,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-16-18.mov'
  },

  {
    id: 5,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-17-23%20(1).mov'
  },
  {
    id: 6,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-18-05%20(1).mov'
  },
  {
    id: 7,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-18-05.mov'
  },
  {
    id: 8,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-04-18%20(1).mov'
  },
  {
    id: 9,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2011-24-09.mov'
  },

  {
    id: 11,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-08-44%20(1).mov'
  },
  {
    id: 12,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-05-38.mov'
  },
  {
    id: 13,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-08-44%20(2).mov'
  },
  {
    id: 14,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2012-08-44.mov'
  },
  {
    id: 15,
    url: 'https://disk.360.yandex.ru/d/kT-3ZE3FsD8iMg/%D0%A1%D0%BC%D0%BE%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/2025-09-22%2019-00-10.mov'
  },

])
</script>

<style scoped lang="scss">
/* ваш стиль оставляем без изменений */
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
