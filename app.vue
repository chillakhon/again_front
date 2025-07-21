<template>
  <div>
    <NuxtLayout>
      <Top />
      <Header />
       <NuxtPage/>
      <Footer />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { init: cartInit } = useCartStore();
onMounted( () => {
  cartInit();
} )
</script>