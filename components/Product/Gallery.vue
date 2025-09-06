<template>
  <ClientOnly>
    <div class="product-gallery" v-if="product.main_image || product.images?.length > 0">
      <swiper-container thumbs-swiper=".my-thumbs" :spaceBetween="15">
        <swiper-slide v-for="(image, index) in product.images" :key="image.id">
          <a :href="getImage( image.path )" data-fancybox="gallery">
            <picture class="product-gallery__main-pic">
              <img
                  :src="getImage( image.path )"
                  class="product-gallery__main-img"
                  :alt="product.name"
              >
            </picture>
          </a>
        </swiper-slide>
      </swiper-container>
      <div class="product-gallery__flex" v-if="product.images">
        <div class="product-gallery__thumbs">
          <swiper-container
              class="my-thumbs"
              :slidesPerView="4"
          >
            <swiper-slide v-for="(image, index) in product.images" :key="image.id">
              <button
                  class="product-gallery__thumbs-item"
                  :class="{ '_active': activeItemIndex === index }"
              >
                <img
                    :src="getImage( image.path )"
                    class="product-gallery__thumbs-img"
                    :alt="product.name"
                >
              </button>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { register } from 'swiper/element/bundle';
register();

defineProps<{
  product: Product
}>();

const activeItemIndex = ref( 0 );

onMounted( () => {
  NativeFancybox.bind('[data-fancybox]', {});

  return () => {
    NativeFancybox.destroy()
  }
} );
</script>

<style scoped lang="scss">
swiper-container::part(container) {
  touch-action: pan-y;
}
</style>