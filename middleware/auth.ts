export default defineNuxtRouteMiddleware((to, from) => {
    const { token, isAuthenticated } = storeToRefs( useAuthStore() );

    if ( isAuthenticated.value && to?.name === 'login' ) {
        return navigateTo('/');
    }

    if ( ! token.value && ! isAuthenticated.value ) {
        return navigateTo('/login');
    }
})