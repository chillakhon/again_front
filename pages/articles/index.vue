<template>
  <Breadcrumbs />

  <section class="section news news-page">
    <div class="news__container container">
      <div class="news__header block__header @@title_class">
        <div class="block__header-title">Вам может быть это&nbsp;интересно!</div>
      </div>
      <NewsGrid />
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.news-page {
  padding: 0 0 7.9rem;
}

</style>