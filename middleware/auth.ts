export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs( useAuthStore() );
    // const isAuthenticated = computed( () => {
    //     return authStore.isAuthenticated;
    // } );

    if ( ! isAuthenticated.value ){
        abortNavigation();
        return navigateTo('/login');
    }

    // if ( isAuthenticated.value ) {
    //     abortNavigation();
    //     return navigateTo('/profile/settings');
    // }

    // if ( ! isAuthenticated.value ){
    //     abortNavigation();
    //     return navigateTo('/');
    // }

    // if ( process.client && ! isAuthenticated.value ){
    //     return navigateTo('/login');
    // }

    // if ( ! token.value && ! isAuthenticated.value ) {
    //     return navigateTo('/login');
    // }
})