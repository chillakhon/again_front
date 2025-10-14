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
              :checked="selectedColor && selectedColor.id === color.id"
              @change="emitColor(color)"
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
            @click="modal.openModal( ModalsSizes, { customClass: 'sizes' } )"
        >Таблица размеров</button>
      </div>
      <div class="product-variables__values">
        <div class="product-variables__size" v-for="(size, key) in sizes" :key="size.id">
          <input
              type="radio"
              name="size"
              :value="size.id"
              :checked="selectedSize && selectedSize.id === size.id"
              :disabled="size.quantity === 0"
              @change="emitSize(size)"
          >
          <label>{{ size.size }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { AvailableVariation, Color } from '~/types/catalog';
import { ModalsSizes } from '#components';

const props = defineProps<{
  variations?: AvailableVariation[],
  colors?: Color[]
}>();

const modal = useModal();
const emit = defineEmits(['getColor', 'getSize']);

const selectedSize = ref<AvailableVariation | null>(null);
const selectedColor = ref<Color | null>(null);

const sizes = computed(() => {
  if (!props.variations || !props.variations.length) return [];

  if (!selectedColor.value) {
    return props.variations.slice();
  }

  const data = props.variations.filter(item => Number(item.color_id) === Number(selectedColor.value!.id));
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  return data.sort((a, b) => {
    const indexA = sizeOrder.indexOf(a.size) === -1 ? Infinity : sizeOrder.indexOf(a.size);
    const indexB = sizeOrder.indexOf(b.size) === -1 ? Infinity : sizeOrder.indexOf(b.size);
    return indexA - indexB;
  });
});

onMounted(() => {
  const variations = props.variations ?? [];
  const colors = props.colors ?? [];

  if (variations.length) {
    selectedSize.value = variations[0];

    const matchedColor = colors.find(c => c.id === variations[0].color_id) ?? colors[0] ?? null;
    selectedColor.value = matchedColor ?? null;

    emit('getColor', selectedColor.value);
    emit('getSize', selectedSize.value);
    return;
  }

  if (colors.length) {
    selectedColor.value = colors[0];
    emit('getColor', selectedColor.value);
  }
});

const emitSize = (size: AvailableVariation) => {
  selectedSize.value = size;
  emit('getSize', size);
}


const emitColor = (color: Color) => {
  selectedColor.value = color;
  emit('getColor', color);

  if (selectedSize.value && Number(selectedSize.value.color_id) === Number(color.id)) {
    return;
  }

  const dataForColor = (props.variations ?? []).filter(v => Number(v.color_id) === Number(color.id));
  const newSize = dataForColor.length ? dataForColor[0] : null;

  selectedSize.value = newSize;
  emit('getSize', newSize);
}
</script>

<style scoped lang="scss">
/* ваш стиль */
</style>
