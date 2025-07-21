<template>
  <Quantity
    :value="value"
  />
</template>

<script setup lang="ts">
defineProps<{
  value: number
}>();
</script>

<style scoped lang="scss">

</style>