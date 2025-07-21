<template>
  <CartTotal
      :is-promocode="false"
      :is-border="true"
      :with-button="withButton"
  />
</template>

<script setup lang="ts">
defineProps<{
  withButton: boolean
}>();
</script>

<style scoped lang="scss">

</style>