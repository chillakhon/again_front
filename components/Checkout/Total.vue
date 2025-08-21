<template>
  <CartTotal
      :is-promocode="true"
      :is-border="true"
      :with-button="false"
  />
</template>

<script setup lang="ts">
defineProps<{
  withButton: boolean
}>();
</script>

<style scoped lang="scss">

</style>