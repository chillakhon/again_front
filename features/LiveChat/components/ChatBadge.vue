<template>
  <div
      class="relative md:w-28 md:h-28 w-[30px] h-[30px] cursor-pointer"
      @click="handleClick"
  >


    <!-- Фон кнопки -->
    <button
        class="w-full h-full rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        :class="{ 'animate-pulse': hasUnread }"
    >
      <!-- Иконка чата -->
      <svg
          class="w-11 h-11 max-md:w-6 max-md:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
      >
        <path
            d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
        />
      </svg>
    </button>

    <!-- Бейдж с количеством непрочитанных -->
    <div
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-10 h-10 max-md:w-6 max-md:max-h-6 rounded-full bg-green-600 text-white text-md max-md:text-sm font-bold flex items-center justify-center border-2 border-white"
    >
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </div>

    <!-- Tooltip -->
    <div
        class="absolute bottom-full right-0 mb-3 bg-gray-900 text-white text-sm px-3 py-2 rounded opacity-0 pointer-events-none transition-opacity duration-300 whitespace-nowrap"
        :class="{ 'opacity-100': isHovered }"
    >
      Онлайн-чат
      <div
          class="absolute top-full right-3 w-2 h-2 bg-gray-900 rotate-45"
      />
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLiveChatStore } from '~/features/LiveChat/stores/useLiveChatStore'

const store = useLiveChatStore()
const isHovered = ref(false)

const unreadCount = computed(() => store.unreadCount)
const hasUnread = computed(() => store.hasUnreadMessages)




const handleClick = () => {
  emit('click')
}

const emit = defineEmits<{
  click: []
}>()
</script>