<template>
  <div class="profile-history__row">
    <ProfileHistoryCard />
  </div>
  <button class="profile-history__btn btn _gray _border">Показать все заказы</button>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  title: 'История заказов',
});

const { data: cards } = await useApi( '/orders/user' );
</script>

<style scoped lang="scss">
.profile-history__btn {
  margin-top: 5.3rem;

  @media (max-width: $mobile) {
    margin-top: 2.5rem;
  }
}

</style>