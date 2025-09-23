<template>
  <div class="news__grid">
    <NewsCard
        v-for="( item, key ) in list"
        :key="key"
        :title="item.title"
        :text="item.text.short"
        :slug="item.slug"
    />
  </div>
</template>

<script setup lang="ts">
import {blogQuery} from "~/stores/blog";

const list = blogQuery().getList();
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