import {defineStore} from 'pinia';

const lockUnlockBody = ( remove = false ) => {
    const body = document.querySelector('body');
    if ( remove ) {
        body.classList.remove('_lock');
    } else {
        body.classList.add('_lock');
    }
}

export const useModal = defineStore('useModal', () => {
    const isActive = ref( false );
    const isScrollable = ref( false );
    const view = ref( {} );
    const props = ref( {} );

    const openModal = ( openView, openProps = {} ) => {
        isActive.value = true;
        view.value = openView;
        props.value = openProps;

        lockUnlockBody();
    }

    const closeModal = () => {
        isActive.value = false;
        setTimeout( () => {
            view.value = {};
            props.value = {};
        }, 300);

        lockUnlockBody( true );
    }

    return {
        isActive,
        isScrollable,
        view,
        props,
        openModal,
        closeModal
    }
} )