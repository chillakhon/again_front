<template>
  <div class="product-gallery">
    <a :href="mainImagePath" class="product-gallery__main" data-fancybox="gallery">
      <picture class="product-gallery__main-pic">
        <img
            :src="mainImagePath"
            class="product-gallery__main-img"
            :alt="product.name"
        >
      </picture>
    </a>
    <div class="product-gallery__flex" v-if="product.images">
      <div class="product-gallery__thumbs">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(image, index) in product.images" :key="image.id">
              <button
                  class="product-gallery__thumbs-item"
                  :class="{ '_active': activeItemIndex === index }"
                  @click="selectImage( index, getImage( image.path ) )"
              >
                <img
                    :src="getImage( image.path )"
                    class="product-gallery__thumbs-img"
                    :alt="product.name"
                >

                <a :href="getImage( image.path )" data-fancybox="gallery"></a>
              </button>
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

const props = defineProps<{
  product: Product
}>();

const mainImagePath = ref( getImage( props.product.main_image?.path ) );
const activeItemIndex = ref( 0 );

onMounted( () => {
  NativeFancybox.bind('[data-fancybox]', {});

  return () => {
    NativeFancybox.destroy()
  }
} );

// const imagesList = ref( [] );
// onMounted( () => {
//   if ( props.product.images ){
//     for ( const item in props.product.images ){
//       if (  props.product.images[item]?.path ){
//         imagesList.value.push( { src: getImage( props.product.images[item].path ) } );
//       }
//     }
//   }
// } )

const selectImage = ( index: number, path: string ) => {
  mainImagePath.value = path;
  activeItemIndex.value = index;
}

// const openFancybox = () => {
//   NativeFancybox.show( imagesList.value );
// }
</script>

<style scoped lang="scss">

</style>