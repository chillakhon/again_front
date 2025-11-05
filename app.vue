<template>
  <div class="">
    <Preloader/>
    <NuxtLayout>
      <Top/>
      <Header/>
      <div class="wrapper">
        <NuxtPage/>
      </div>
      <Footer/>
    </NuxtLayout>

    <Livechatwidget/>
  </div>
</template>

<script setup lang="ts">
import Livechatwidget from "~/features/LiveChat/components/Livechatwidget.vue";

const {init: cartInit} = useCartStore();
const {init: cookieInit} = useCookieStore();
onMounted(() => {
  cartInit();
  cookieInit();
})
</script>