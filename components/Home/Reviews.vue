<template>
  <section class="reviews">
    <div class="reviews__container container">
      <div class="product-reviews__header">
        <div class="product-reviews__title block__title fz-h2">Отзывы</div>
        <div class="product-reviews__header-right">
          <div class="swiper__nav">
            <button class="swiper__arrow _border swiper__arrow--prev product-reviews__prev">
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.146447 4.35355C-0.0488155 4.15829 -0.0488155 3.84171 0.146447 3.64645L3.32843 0.464466C3.52369 0.269204 3.84027 0.269204 4.03553 0.464466C4.2308 0.659728 4.2308 0.97631 4.03553 1.17157L1.20711 4L4.03553 6.82843C4.2308 7.02369 4.2308 7.34027 4.03553 7.53553C3.84027 7.7308 3.52369 7.7308 3.32843 7.53553L0.146447 4.35355ZM1 4.5L0.5 4.5L0.5 3.5L1 3.5L1 4.5Z" fill="black"/>
              </svg>
            </button>
            <button class="swiper__arrow _border swiper__arrow--next product-reviews__next">
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85355 4.35355C5.04882 4.15829 5.04882 3.84171 4.85355 3.64645L1.67157 0.464466C1.47631 0.269204 1.15973 0.269204 0.964466 0.464466C0.769204 0.659728 0.769204 0.97631 0.964466 1.17157L3.79289 4L0.964466 6.82843C0.769204 7.02369 0.769204 7.34027 0.964466 7.53553C1.15973 7.7308 1.47631 7.7308 1.67157 7.53553L4.85355 4.35355ZM4 4.5L4.5 4.5L4.5 3.5L4 3.5L4 4.5Z" fill="black"/>
              </svg>
            </button>
          </div>
          <button class="product-reviews__button" @click="openModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2594 3.59997L5.04936 12.29C4.73936 12.62 4.43936 13.27 4.37936 13.72L4.00936 16.96C3.87936 18.13 4.71936 18.93 5.87936 18.73L9.09936 18.18C9.54936 18.1 10.1794 17.77 10.4894 17.43L18.6994 8.73997C20.1194 7.23997 20.7594 5.52997 18.5494 3.43997C16.3494 1.36997 14.6794 2.09997 13.2594 3.59997Z" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.8906 5.05005C12.3206 7.81005 14.5606 9.92005 17.3406 10.2" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 22H21" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Написать отзыв</span>
          </button>
        </div>
      </div>
      <swiper-container
          v-if="reviews?.success && reviews.data.length"
          class="swiper product-reviews__swiper"
          :auto-height="true"
          :navigation="{
          nextEl: '.product-reviews__next',
          prevEl: '.product-reviews__prev',
        }"
          :breakpoints="{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          575: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 16,
          }
        }"
      >
        <swiper-slide v-for="review in reviews.data" :key="review.id">
          <ReviewsCard
              :rating="review.rating"
              :content="review.content"
              :user-name="review?.client?.name"
              :date="review.published_at"
          />
        </swiper-slide>
      </swiper-container>
      <div v-else>Отзывов не добавлено</div>

      <!--    <button class="product-reviews__more">Показать еще отзывы</button>-->
      <button class="product-reviews__button _mobile" @click="openModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.2594 3.59997L5.04936 12.29C4.73936 12.62 4.43936 13.27 4.37936 13.72L4.00936 16.96C3.87936 18.13 4.71936 18.93 5.87936 18.73L9.09936 18.18C9.54936 18.1 10.1794 17.77 10.4894 17.43L18.6994 8.73997C20.1194 7.23997 20.7594 5.52997 18.5494 3.43997C16.3494 1.36997 14.6794 2.09997 13.2594 3.59997Z" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.8906 5.05005C12.3206 7.81005 14.5606 9.92005 17.3406 10.2" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 22H21" stroke="#4B4B4B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Написать отзыв</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ModalsReview} from "#components";
import type {Review} from "~/types/review";
import { register } from 'swiper/element/bundle';
register();

const { data: reviews } = await useApi<{
  success: boolean,
  data: Review[],
}>( '/reviews/home-random' );

const modal = useModal();
const openModal = () => {
  modal.openModal( ModalsReview, {
    customClass: 'review'
  } )
}
</script>

<style scoped lang="scss">
.reviews {
  padding: 3.5rem 0 9rem;

  @media (max-width: $mobile) {
    padding: 2.5rem 0 2.25rem;
  }
}

.reviews__row {
  max-width: 98.2rem;
  margin: 0 auto;
}

.reviews__btn {
  margin-top: 4rem;
}

.reviews-item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    .reviews-item__media {
      order: 2;
    }

    .reviews-item__content {
      order: 1;
      margin-left: 0;
      margin-right: 3.3rem;
    }
  }

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    .reviews-item__media {
      order: 2 !important;
      margin-top: 1rem;
    }

    .reviews-item__content {
      order: 1 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      width: 100% !important;
    }
  }
}

.reviews-item__media {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: $mobile) {
    width: 4.9rem;
    height: 4.9rem;
    margin-left: 0 !important;
  }
}

.reviews-item__content {
  width: calc(100% - 10rem);
  margin-left: 3.3rem;
  padding: 3.1rem 4.3rem 3.2rem 5rem;
  background: #F3F4F8;
  border-radius: 1rem;

  @media (max-width: $mobile) {
    padding: 2.2rem 1.5rem 2.3rem;
  }
}

.reviews-item__text {
  & > * {
    margin-bottom: 1.7rem;
    font-size: var(--fz-1-5);
    color: var(--fg-gray);
    line-height: 130%;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $mobile) {
      font-size: var(--fz-regular);
    }
  }
}

.reviews-item__name {
  margin-top: 1rem;
  color: var(--fg-gray);
  opacity: .5;
}

</style>