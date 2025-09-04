import {defineStore} from 'pinia';
import lockUnlockBody from "~/utils/lockUnlockBody.js";

export const useMobileMenuStore = defineStore('mobileMenuStore', () => {
    const isActive = ref( false );

    const toggle = () => {
        isActive.value = !isActive.value;
        lockUnlockBody();
    }

    const close = () => {
        if ( isActive.value ){
            isActive.value = false;
            lockUnlockBody();
        }
    }

    return {
        isActive,
        toggle,
        close
    }
} )