import Vue3Mask from 'vue-3-mask';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Mask);
});