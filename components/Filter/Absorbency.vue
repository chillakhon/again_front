<template>
  <div class="filter-absorbency">
    <div
        v-for="level in absorbencyLevels"
        :key="level.value"
        class="filter-absorbency__item"
        :class="{ '_active': selectedLevel === level.value }"
        @click="selectLevel(level.value)"
    >


      <div class="catalog-item__drop">

        <svg width="35" height="53" viewBox="0 0 35 53" fill="none" xmlns="http://www.w3.org/2000/svg"
             v-for="i in level.value">
          <path
              d="M17.5 2.44238C17.9642 3.22192 18.5965 4.2922 19.3438 5.5791C20.9647 8.37082 23.1253 12.1781 25.2842 16.2441C27.4447 20.3133 29.5956 24.6268 31.2041 28.4336C32.0084 30.3371 32.6709 32.0998 33.1309 33.6328C33.5953 35.181 33.8339 36.4317 33.834 37.333C33.834 45.0358 26.6503 51.5 17.5 51.5C8.3499 51.4998 1.16699 45.0357 1.16699 37.333C1.16705 36.4317 1.40466 35.181 1.86914 33.6328C2.3291 32.0997 2.99251 30.3372 3.79688 28.4336C5.40542 24.6268 7.55625 20.3133 9.7168 16.2441C11.8757 12.1782 14.0363 8.37079 15.6572 5.5791C16.4043 4.29242 17.0359 3.22186 17.5 2.44238Z"
              stroke="#CB0B13" stroke-width="2" fill="#CB0B13"/>
        </svg>

<!--        <svg-->
<!--            v-for="i in level.value"-->
<!--            :key="i"-->
<!--            class="filter-absorbency__drop"-->
<!--            width="8"-->
<!--            height="12"-->
<!--            viewBox="0 0 8 12"-->
<!--            fill="none"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--        >-->
<!--          <path d="M4 0C2.5 2 0 5.5 0 8C0 10.2091 1.79086 12 4 12C6.20914 12 8 10.2091 8 8C8 5.5 5.5 2 4 0Z" fill="currentColor"/>-->
<!--        </svg>-->
      </div>
      <span class="filter-absorbency__label">{{ level.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'select-absorbency', value: number | null): void
}>()

const selectedLevel = ref<number | null>(null)

const absorbencyLevels = [
  { value: 1, label: '1 капля' },
  { value: 2, label: '2 капли' },
  { value: 3, label: '3 капли' },
  { value: 4, label: '4 капли' },
  { value: 5, label: '5 капель' },
  { value: 6, label: '6 капель' },
]

const selectLevel = (level: number) => {
  if (selectedLevel.value === level) {
    selectedLevel.value = null
    emit('select-absorbency', null)
  } else {
    selectedLevel.value = level
    emit('select-absorbency', level)
  }
}

// Сброс фильтра извне
defineExpose({
  reset: () => {
    selectedLevel.value = null
  }
})
</script>

<style scoped lang="scss">



.filter-absorbency {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}


.catalog-item__drop {
  display: flex;
  align-items: center;
  margin-top: 1rem;

  & svg {
    width: 1.3rem;
    height: auto;
    margin-right: .8rem;

    &:last-child {
      margin-right: 0;
    }
  }
}


.filter-absorbency__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border: 1px solid #E3E3E3;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--fg-white);

  &:hover {
    border-color: var(--bg-filter-button);
    background: rgba(var(--bg-filter-button-rgb), 0.05);
  }

  &._active {
    border-color: var(--bg-filter-button);
    background: var(--bg-filter-button);
    color: var(--fg-white);

    .filter-absorbency__drop {
      color: var(--fg-white);
    }
  }
}

.filter-absorbency__drops {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}

.filter-absorbency__drop {
  color: #4A9EFF;
  transition: color 0.2s;
}

.filter-absorbency__label {
  font-size: 1.3rem;
  font-weight: 500;
}
</style>