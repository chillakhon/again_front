<template>
  <div class="form__row" :class="rowClass">
    <div class="select" :class="{ 'select--active': isActive }">
      <button class="select__result" @click="toggle">
        <span>{{ placeholder }}</span>
        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-90e05f7c="">
          <path opacity="0.4" d="M5 5L9.33013 0.5H0.669873L5 5Z" fill="#545454" data-v-90e05f7c=""></path>
        </svg>
      </button>
      <div class="select__list">
        <button
            class="select__item"
            v-for="( item, key ) in list"
            @click="selected( item.id, item.name, item.code )"
        >
          {{ item.name }}
        </button>
      </div>
    </div>

    <div class="form__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import type {Country} from "~/types/countries";

const props = withDefaults( defineProps<{
  name: string,
  placeholder?: string,
  rowClass?: string,
  error?: string,
  list: Country[]
}>(), {
  error: '',
  placeholder: 'Выбрать'
} );

const placeholder = ref( props.placeholder );
const isActive = ref( false );

const toggle = () => {
  isActive.value = !isActive.value;

  const prevSelects = document.querySelectorAll( ".select" );
  if ( prevSelects ){
    prevSelects.forEach( ( item ) => {
      item.classList.remove( 'select--active' );
    } )
  }
}

const emit = defineEmits(['getSelectedValue']);
const selected = ( id: number, title: string, code?: string ) => {
  emit('getSelectedValue', {
    name: props.name,
    id: id,
    title: title,
    code: code
  } );

  placeholder.value = title;
  isActive.value = false;
}
</script>

<style scoped lang="scss">
.select {
  $root: &;

  &__result {
    min-height: 7rem;
    width: 100%;
    border-radius: 6rem;
    border: 0.1rem solid var(--fg-input-border);
    padding: 0 2.7rem;
    font-size: 1.6rem;
    font-family: var(--ff-regular);

    display: flex;
    align-items: center;
    position: relative;

    & svg {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: auto;
      transition: var(--tr-regular);
    }
  }

  &__list {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 99;
    background: var(--fg-white);
    border-radius: 2rem;
    border: 0.1rem solid var(--fg-input-border);
    padding: 1rem 2rem;
    max-height: 30rem;
    overflow-y: auto;
    overflow-x: hidden;
    opacity: 0;
    pointer-events: none;
  }

  &__item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--fg-input-border);

    @media (any-hover: hover) {
      &:hover {
        opacity: .7;
      }
    }
  }

  &--active {
    #{$root}__result {
      & svg {
        transform: translateY(-50%) rotate(-180deg);
      }
    }

    #{$root}__list {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>