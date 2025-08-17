import {defineStore} from 'pinia';

export const useMobileMenuStore = defineStore('mobileMenuStore', () => {
    const isActive = ref( false );

    const toggle = () => {
        isActive.value = !isActive.value;
    }

    return {
        isActive,
        toggle
    }
} )