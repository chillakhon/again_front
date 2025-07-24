<template>
  <div class="top">
    Мы доставляем по всему миру!
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.top {
  background: #545454;
  padding: .2rem 0 .3rem;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 2.7rem;
  color: var(--fg-white);
  text-align: center;
  box-shadow: 0 -1px 23px 2px rgba(0, 0, 0, 0.09);
  font-family: var(--ff-mulish);

  @media (max-width: $tablet) {
    font-size: 1.4rem;
  }
}
</style>