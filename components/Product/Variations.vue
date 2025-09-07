<template>
  <div class="product__variables product-variables">
    <div class="product-variables__block" data-type="size" v-if="variations && variations.length > 0">
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
        <div class="product-variables__size" v-for="(size, key) in variations" :key="size.product_variant_id">
          <input type="radio" name="size" :value="size.product_variant_id" :checked="variations[key] === size" @change="emit( 'getSize', size )">
          <label>{{ size.size }}</label>
        </div>
      </div>
    </div>
    <div class="product-variables__block" data-type="color" v-if="colors">
      <div class="product-variables__header">
        <div class="product-variables__title">Цвет:</div>
      </div>
      <div class="product-variables__values">
        <div class="product-variables__color" v-for="(color, key) in colors" :key="color.id" :style="{ '--color': color.code }">
          <input type="radio" name="color" :value="color.id" :checked="colors[key] === color" @change="emit( 'getColor', color )">
          <label for=""></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Variation, Color} from "~/types/catalog";
import {ModalsSizes} from "#components";

const props = defineProps<{
  variations?: Variation[],
  colors?: Color[]
}>();

const modal = useModal();
const emit = defineEmits( ['getColor', 'getSize'] );

onMounted( () => {
  if ( props.variations?.length ){
    emit( 'getSize', props.variations[0] );
  }

  if ( props.colors?.length ){
    emit( 'getColor', props.colors[0] );
  }
} )
</script>

<style scoped lang="scss">

</style>