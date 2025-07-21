export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if ( authStore.isAuthenticated && authStore.token ) {
        return navigateTo('/profile/settings')
    }
})