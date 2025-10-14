<template>
  <ClientOnly>
    <div class="product-gallery" v-if="images.length > 0">
      <swiper-container
          ref="mainSwiperEl"
          :key="galleryKey"
          thumbs-swiper=".my-thumbs"
          :spaceBetween="15"
      >
        <swiper-slide v-for="(image, index) in images" :key="image.id ?? index">
          <a :href="getImage(image.path)" data-fancybox="gallery">
            <picture class="product-gallery__main-pic">
              <img
                  :src="getImage(image.path)"
                  class="product-gallery__main-img"
                  :alt="product.name"
              />
            </picture>
          </a>
        </swiper-slide>
      </swiper-container>

      <div class="product-gallery__flex" v-if="images.length > 1">
        <div class="product-gallery__thumbs">
          <swiper-container
              ref="thumbsSwiperEl"
              class="my-thumbs"
              :key="galleryKey + '-thumbs'"
              :slidesPerView="4"
          >
            <swiper-slide v-for="(image, index) in images" :key="image.id ?? 't' + index">
              <button
                  class="product-gallery__thumbs-item"
                  :class="{ '_active': activeItemIndex === index }"
                  @click="goTo(index)"
                  type="button"
              >
                <img
                    :src="getImage(image.path)"
                    class="product-gallery__thumbs-img"
                    :alt="product.name"
                />
              </button>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>


<!--    {{selectedSize}}-->

  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import type { Product } from '~/types/catalog';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { register } from 'swiper/element/bundle';
register();

const props = defineProps<{
  product: Product,
  selectedSize: any,
}>();

const activeItemIndex = ref(0);

const mainSwiperEl = ref<HTMLElement | null>(null);
const thumbsSwiperEl = ref<HTMLElement | null>(null);

const images = computed(() => {
  const sel = props.selectedSize;
  if (sel && Array.isArray(sel.images) && sel.images.length > 0) {
    return sel.images;
  }
  if (Array.isArray(props.product?.images) && props.product.images.length > 0) {
    return props.product.images;
  }
  if (props.product?.main_image) {
    return [props.product.main_image];
  }
  return [];
});

const galleryKey = computed(() => {
  return 'g-' + images.value.map((i: any) => i?.id ?? i?.path ?? '').join('-');
});

function goTo(index: number) {
  activeItemIndex.value = index;
  const mainEl: any = mainSwiperEl.value;
  if (mainEl?.swiper && typeof mainEl.swiper.slideTo === 'function') {
    mainEl.swiper.slideTo(index);
  } else {
    nextTick().then(() => {
      const m: any = mainSwiperEl.value;
      if (m?.swiper && typeof m.swiper.slideTo === 'function') {
        m.swiper.slideTo(index);
      }
    });
  }
}

watch(images, async () => {
  activeItemIndex.value = 0;

  await nextTick();

  try {
    NativeFancybox.bind('[data-fancybox]', {});
  } catch (e) {
    // ignore
  }

  const mainEl: any = mainSwiperEl.value;
  if (mainEl?.swiper && typeof mainEl.swiper.slideTo === 'function') {
    mainEl.swiper.slideTo(0);
  } else {
    setTimeout(() => {
      const m: any = mainSwiperEl.value;
      if (m?.swiper && typeof m.swiper.slideTo === 'function') {
        m.swiper.slideTo(0);
      }
    }, 50);
  }
}, { immediate: true });

onMounted(() => {
  NativeFancybox.bind('[data-fancybox]', {});
});

onBeforeUnmount(() => {
  try {
    NativeFancybox.destroy();
  } catch (e) {
    // ignore
  }
});
</script>

<style scoped lang="scss">
swiper-container::part(container) {
  touch-action: pan-y;
}
</style>
