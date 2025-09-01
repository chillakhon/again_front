import {defineStore, skipHydrate} from 'pinia';
import {ModalsMessage} from "#components";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref( {} );
    const token = useLocalStorage( 'auth_token', '' );
    const isAuthenticated  = ref( false );
    const isCodeActive = ref( false );
    const modal = useModal();

    const sendCode = async ( email ) => {
        const { data } = await useApi( '/login', {
            params: {
                email: email,
            }
        }, '', 'POST' );

        if ( data.value.success ){
            isCodeActive.value = true;
            modal.openModal( ModalsMessage, {
                customClass: 'message',
                title: 'Код подтрвеждения',
                text: 'На вашу почту был отправлен код для авторизации на сайте'
            } )
        }

        return data;
    }

    const login = async (email, code) => {
        try {
            const { data, error } = await useApi( '/check-verification', {
                body: {
                    email: email,
                    verification_code: code
                }
            }, '', 'POST');

            if ( ! data.value?.user || ! data.value?.token ){
                return error.value;
            }

            user.value = data.value.user;
            token.value = data.value.token;
            isAuthenticated.value = true;
            isCodeActive.value = false;


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
        if ( token.value ){
            try {
                const { data } = await useApi( '/client-user');

                if ( data.value.success ){
                    user.value = data.value.user;
                    isAuthenticated.value = true;
                }
            } catch( error ) {
                return error;
            }

        } else {
            token.value = '';
            isAuthenticated.value = false;
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