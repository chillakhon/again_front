<template>
  <div class="product__variables product-variables">
    <div class="product-variables__block" data-type="color" v-if="colors">
      <div class="product-variables__header">
        <div class="product-variables__title">Цвет:</div>
      </div>
      <div class="product-variables__values">
        <div
            class="product-variables__color"
            v-for="(color, key) in colors"
            :key="color.id"
            :style="{ '--color': color.code }"
            :class="{ '_white': color.code === '#FFFFFF' }"
        >
          <input
              type="radio"
              name="color"
              :value="color.id"
              :checked="key === 0"
              @change="emitColor( color )"
          >
          <label for=""></label>
        </div>
      </div>
    </div>
    <div class="product-variables__block" data-type="size" v-if="sizes && sizes.length > 0">
      <div class="product-variables__header">
        <div class="product-variables__title">Размер:</div>
        <button
            class="product-variables__link"
            @click="modal.openModal( ModalsSizes, {
              customClass: 'sizes'
            } )"
        >Таблица размеров</button>
      </div>
      <div class="product-variables__values">
        <div class="product-variables__size" v-for="(size, key) in sizes" :key="size.id">
          <input
              type="radio"
              name="size"
             :value="size.id"
             :checked="key === 0"
             :disabled="size.quantity === 0"
             @change="emitSize( size )"
          >
          <label>{{ size.size }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Variation, Color, AvailableVariation} from "~/types/catalog";
import {ModalsSizes} from "#components";

const props = defineProps<{
  variations?: AvailableVariation[],
  colors?: Color[]
}>();

const modal = useModal();
const emit = defineEmits( ['getColor', 'getSize'] );

const selectedSize = ref( {} );
const selectedColor = ref( {} );

onMounted( () => {
  if ( props.variations?.length ) {
    selectedSize.value = props.variations[0];
    emit( 'getSize', selectedSize.value );
  }

  if ( props.colors?.length ) {
    selectedColor.value = props.colors[0];
    emit( 'getColor', selectedColor.value );
  }
} );

const emitSize = ( size: object ) => {
  emit( 'getSize', size );
  selectedSize.value = size;
}

const emitColor = ( color: object ) => {
  emit( 'getColor', color );
  selectedColor.value = color;
}

const sizes = computed( () => {
  if (
      props.colors?.length === 0
      || props.variations?.length === 0
  ){
    return [];
  }

  return props.variations.filter(item => item.color_id === selectedColor.value.id );
} );
</script>

<style scoped lang="scss">

</style>