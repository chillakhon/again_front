<template>
  <div class="product-gallery">
    <div class="product-gallery__main">
      <picture class="product-gallery__main-pic">
        <img
            :src="getImage( product.main_image?.path ? product.main_image.path : '' )"
            class="product-gallery__main-img"
            :alt="product.name"
        >
      </picture>
    </div>
    <div class="product-gallery__flex" v-if="product.images">
      <div class="product-gallery__thumbs">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="image in product.images" :key="image.id">
              <a :href="getImage( image.path )"
                 class="product-gallery__thumbs-item _active"
                 data-fancybox="gallery"
              >
                <img
                    :src="getImage( image.path )"
                    class="product-gallery__thumbs-img"
                    :alt="product.name"
                >
              </a>
            </div>
          </div>
        </div>
        <button class="product-gallery__next">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.6" d="M1 13L7 7L1 1" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <a
          v-if="product.main_image && product.images.length > 5"
          :href="getImage( product.main_image.path )"
          class="product-gallery__count"
          data-fancybox="product_gallery">
        +10
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css';

defineProps<{
  product: Product
}>();

onMounted( () => {
  NativeFancybox.bind('[data-fancybox]', {});

  return () => {
    NativeFancybox.destroy()
  }
} )
</script>

<style scoped lang="scss">

</style>