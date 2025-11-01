import {useRoute} from '#app/composables/router';

export async function useApi<T>(url: string, options: object = {}, slug?: string, method: string = 'GET') {


    const route = useRoute();
    const DEV_URI = useRuntimeConfig().public.DEV_URI;
    const authStore = useAuthStore();

    if (!slug) {
    }


    options = {
        ...options,
        method: method,
        headers: {
            'Authorization': `Bearer ${authStore.token}`,
        }
    };


    return useFetch<T>(DEV_URI + url, options);
}

export default useApi;