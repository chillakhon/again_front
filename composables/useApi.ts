import {useRoute} from '#app/composables/router';

export async function useApi<T>(url: string, options: object = {}, slug?: string, method: string = 'GET') {


    const route = useRoute();
    const DEV_URI = useRuntimeConfig().public.DEV_URI;
    const authStore = useAuthStore();

    if (!slug) {
    }

    const finalMethod = (options as any).method || method;

    options = {
        ...options,
        method: finalMethod,
        headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
            ...(options as any).headers,
        }
    };


    return useFetch<T>(DEV_URI + url, options);
}

export default useApi;