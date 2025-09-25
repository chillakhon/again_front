<template>
  <div>
    <Preloader />
    <NuxtLayout>
      <Top />
      <Header />
        <div class="wrapper">
          <NuxtPage/>
        </div>
      <Footer />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { init: cartInit } = useCartStore();
const { init: cookieInit } = useCookieStore();
onMounted( () => {
  cartInit();
  cookieInit();
} )
</script>