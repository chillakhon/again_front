export default defineNuxtRouteMiddleware((to, from) => {
    const { token, isAuthenticated } = storeToRefs( useAuthStore() );

    if ( token.value && to?.name === 'login' ) {
        return navigateTo('/');
    }

    if ( ! token.value || ! isAuthenticated.value ) {
        abortNavigation();
        return navigateTo('/login');
    }
})