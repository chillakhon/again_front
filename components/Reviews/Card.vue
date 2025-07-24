<template>
  <div class="product-reviews__item">
    <div class="product-reviews__item-text" v-if="content" v-html="content"></div>
    <div class="product-reviews__item-flex">
      <div class="product-reviews__item-stars">
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-for="star in rating">
          <path d="M6.75667 0.193448C6.91076 -0.0676563 7.28848 -0.0676558 7.44257 0.193448L9.3186 3.37249C9.37461 3.46741 9.46746 3.53487 9.57504 3.55881L13.1782 4.36065C13.4742 4.4265 13.5909 4.78574 13.3902 5.01297L10.9464 7.77956C10.8735 7.86216 10.838 7.97132 10.8485 8.08103L11.1993 11.7556C11.2282 12.0574 10.9226 12.2795 10.6444 12.1588L7.25811 10.6896C7.157 10.6457 7.04223 10.6457 6.94113 10.6896L3.55479 12.1588C3.27666 12.2795 2.97107 12.0574 2.99989 11.7556L3.35075 8.08103C3.36122 7.97131 3.32576 7.86216 3.25279 7.77956L0.809064 5.01297C0.608354 4.78574 0.725078 4.4265 1.02102 4.36065L4.62419 3.55881C4.73178 3.53487 4.82463 3.46741 4.88064 3.37249L6.75667 0.193448Z" fill="#F7BB2B"/>
        </svg>
      </div>
      <div class="product-reviews__item-icon">”</div>
    </div>
    <div class="product-reviews__item-user">
      <div class="product-reviews__item-user__content">
        <div class="product-reviews__item-user__name" v-if="userName">{{ userName }}</div>
        <div class="product-reviews__item-user__date">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number,
  content?: string,
  userName?: string,
  date: string
}>();
</script>

<style scoped lang="scss">

</style>