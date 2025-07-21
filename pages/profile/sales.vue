<template>
  <div class="profile-sales__grid">
    <ProfileSalesCard />
    <ProfileSalesCard />
    <ProfileSalesCard />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  title: 'Ваши скидки и бонусы',
})
</script>

<style scoped lang="scss">
.profile-sales__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.7rem;

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

</style>