<template>
  <div class="news__grid">
    <NewsCard />
    <NewsCard />
    <NewsCard />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3rem;
  column-gap: 1.8rem;

  @media (max-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    row-gap: 2.2rem;
  }
}
</style>