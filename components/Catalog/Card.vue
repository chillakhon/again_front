<template>
  <article class="catalog-item" :data-id="product.id">
    <div class="catalog-item__card">
      <NuxtLink :to="to" class="catalog-item__media">
        <picture class="catalog-item__media-pic">
          <img
              :src="getImage( product.main_image?.path ? product.main_image?.path : '' )"
               alt=""
               class="catalog-item__media-img catalog-item__media-main"
          >
          <img v-if="product.images?.length"
              :src="getImage( product.images[0].path )"
              alt=""
              class="catalog-item__media-img catalog-item__media-on-hover"
          >
        </picture>
<!--        <div class="catalog-item__sale">скидка 21 %</div>-->
        <div class="catalog-item__rating" v-if="product.avg_rating">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0L6.41068 3.05836L9.75528 3.45492L7.28254 5.74164L7.93893 9.04508L5 7.4L2.06107 9.04508L2.71746 5.74164L0.244718 3.45492L3.58932 3.05836L5 0Z" fill="black"/>
          </svg>
          <span>{{ product.avg_rating }}</span>
        </div>
        <ClientOnly>
          <button
              class="catalog-item__fav add-to-fav"
              :class="{ '_active': isFavourite }"
              @click="favouritesStore.toggleFavourites( product )"
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.62 18.8101C11.28 18.9301 10.72 18.9301 10.38 18.8101C7.48 17.8201 1 13.6901 1 6.6901C1 3.6001 3.49 1.1001 6.56 1.1001C8.38 1.1001 9.99 1.9801 11 3.3401C12.01 1.9801 13.63 1.1001 15.44 1.1001C18.51 1.1001 21 3.6001 21 6.6901C21 13.6901 14.52 17.8201 11.62 18.8101Z" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </ClientOnly>
      </NuxtLink>
      <div class="catalog-item__content">
        <div class="catalog-item__header">
          <NuxtLink :to="to" class="catalog-item__title">
            {{ product.name }}
          </NuxtLink>
          <div class="catalog-item__price" v-if="product.price">
            <div class="catalog-item__price-new">{{ getNormalPrice( product.price, product.old_price ) }} ₽</div>
            <div class="catalog-item__price-old" v-if="product.old_price">{{ formattedPrice( product.old_price ) }} ₽</div>
          </div>
        </div>
        <div class="catalog-item__subtitle" v-if="product.description">{{ product.description }}</div>
        <div class="catalog-item__colors colors" v-if="product.colors && product.colors.length > 0">
          <div class="colors__list">
            <div
                v-for="(color, key) in product.colors"
                :key="color.id"
                class="colors__item"
                :class="{ '_white': isWhiteColor( color.code ) }"
                :style="{ '--color': color.code }"
            >
              <input
                  type="radio"
                  class="colors__input"
                  :value="color.id"
                  :checked="product.colors[key] === color"
              >
              <label for="color" class="colors__label"><span></span></label>
            </div>
          </div>
        </div>
        <NuxtLink :to="to" class="catalog-item__btn">
          <span>Подробнее</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.0920253 9.11633L7.20409 2.00427H0.676418V0.350437H10.0267V9.70073L8.37287 9.70073L8.37287 3.17306L1.26081 10.2851L0.0920253 9.11633Z" fill="#3F3F3F"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type {Product} from "~/types/catalog";

const props = defineProps<{
  product: Product
}>();

const { formattedPrice, getNormalPrice } = getFormatPrice();
const favouritesStore = useFavouritesStore();

const to = computed( () => {
  return {
    name: 'catalog-slug',
    params: {
      slug: props.product.id
    }
  }
} )

const isFavourite = computed( () => {
  return favouritesStore.isFavorite( props.product.id )
} )
</script>

<style scoped lang="scss">
.catalog-item {
  position: relative;
  padding-bottom: calc( 5rem + 1.5rem );

  @media (max-width: $mobile) {
    padding-bottom: 5rem;
  }

  &__media {
    $media: &;
    position: relative;

    &-pic {
      min-height: 32.8rem;
      border-radius: 2rem;
      overflow: hidden;
      position: relative;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
      transition: var(--tr-regular);
    }

    &-on-hover {
      opacity: 0;
    }

    @media (any-hover: hover) {
      &:hover {
        #{$media}-main {
          opacity: 0;
        }

        #{$media}-main-on-hover {
          opacity: 1;
        }
      }
    }
  }

  &__sale {
    position: absolute;
    top: 1rem;
    left: 1rem;
    border-radius: 2.4rem;
    padding: 1rem .8rem 1rem 1rem;
    background: var(--fg-white);
    font-size: 1.2rem;
  }

  &__fav {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    top: 1rem;
    right: .9rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: var(--fg-white);

    & svg {
      max-width: 1.5rem;
    }

    & path {
      transition: var(--tr-regular);
    }

    &._active path {
      fill: #CB0B13;
      stroke: #CB0B13;
    }

    &:hover {
      & path {
        fill: #CB0B13;
        stroke: #CB0B13;
      }
    }
  }

  &__rating {
    display: flex;
    align-items: flex-start;
    position: absolute;
    bottom: 1.7rem;
    left: 1.5rem;

    & span {
      margin-top: .6rem;
      line-height: 100%;
      font-weight: 300;
      margin-right: .1rem;
    }
  }

  &__content {
    padding-top: 1.6rem;
    color: var(--fg-black);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 300;
    color: #000;

    @media (max-width: $mobile){
      font-size: 1.6rem;
    }
  }

  &__price {
    display: flex;
    align-items: flex-end;
    color: var(--fg-black);
    min-width: fit-content;
    margin-left: 1.5rem;

    &-new {
      font-size: 1.8rem;
      line-height: 100%;

      @media (max-width: $mobile) {
        font-size: 1.4rem;
      }
    }

    &-old {
      margin-left: .6rem;
      font-size: 1.3rem;
      line-height: 100%;
      opacity: .3;
      text-decoration: line-through;
      font-weight: 700;

      @media (max-width: $mobile) {
        font-size: 1rem;
      }
    }
  }

  &__subtitle {
    opacity: .5;

    @media (max-width: $mobile){
      font-size: 1.2rem;
      margin-bottom: 0;
    }
  }

  &__colors {
    margin-top: 1.5rem;

    & .colors__item {
      margin-right: .634rem;
    }
  }

  &__btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.7rem 1.4rem 2.1rem;
    border: .1rem solid #3F3F3F;
    border-radius: 5.3rem;
    color: #3F3F3F;

    @media(any-hover: hover) {
      &:hover {
        background: #3F3F3F;
        color: var(--fg-white);

        & path {
          fill: var(--fg-white);
        }
      }
    }

    & path {
      transition: var(--tr-regular);
    }

    @media (max-width: $mobile) {
      margin-top: 0;
      padding: .9rem 1rem .7rem 1.5rem;
      font-size: 1rem;

      & svg {
        margin-left: 2rem;
      }
    }
  }
}

//.catalog-item__bottom {
//  @media (max-width: $mobile) {
//    display: flex;
//    align-items: center;
//    justify-content: space-between;
//  }
//}
</style>