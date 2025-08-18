<template>
  <Breadcrumbs />
  <div class="certificates page-padding">
    <div class="certificates__container container">
      <div class="certificates-block__header block__header _left _30">
        <h1 class="block__header-title fz-h2--mobile">Сертификаты</h1>
      </div>
      <div class="certificates__grid">
        <div class="certificates__item item--cover" v-for="( item, key ) in list" :key="key">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta( {
  title: 'Сертификаты',
} )

const list = ref( [
    '/img/certificates.again/1.jpg'
] )
</script>

<style scoped lang="scss">
.certificates__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
  }
}

.certificates__item {
  min-height: 20rem;

  @media (max-width: $mobile) {
    min-height: 15rem;
  }
}
</style>