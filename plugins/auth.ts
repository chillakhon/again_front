export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();

    if ( process.client && authStore.token ) {
        await authStore.checkAuth();
    }

    return {
        provide: {
            auth: authStore,
        },
    }
})