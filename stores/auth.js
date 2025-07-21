import {defineStore, skipHydrate} from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
    const user = ref( {} );
    const token = useLocalStorage( 'auth_token', '' );
    const isAuthenticated  = ref( false );
    const isCodeActive = ref( false );

    const sendCode = async ( email ) => {
        const { data } = await useApi( '/login', {
            params: {
                email: email,
            }
        }, '', 'POST' );

        if ( data.value.success ){
            isCodeActive.value = true;
        }
    }

    const login = async (email, code) => {
        try {
            const { data } = await useApi( '/check-verification', {
                body: {
                    email: email,
                    verification_code: code
                }
            }, '', 'POST');

            user.value = data.value.user;
            token.value = data.value.token;
            isAuthenticated.value = true;

            if (process.client) {
                localStorage.setItem('auth_token', data.value.token)
            }

            return navigateTo( '/profile/settings' );
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        user.value = {};
        token.value = null;
        isAuthenticated.value = false;

        if (process.client) {
            localStorage.removeItem('auth_token');
        }

        return navigateTo( '/' );
    }

    const checkAuth = async () => {
        if (process.client) {
            const token = localStorage.getItem('auth_token');
            const { data } = await useApi( '/client-user');

            if ( token && data.value.success ){
                user.value = data.value.user;
                isAuthenticated.value = true;
            }
        }
    }

    return {
        user,
        token: skipHydrate( token ),
        isAuthenticated,
        isCodeActive,
        sendCode,
        login,
        logout,
        checkAuth
    }
} )