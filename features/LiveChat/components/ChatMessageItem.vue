<template>
  <div
      class="flex items-end gap-2 animate-fade-in-up"
      :class="!isOutgoing ? 'justify-end' : 'justify-start'"
  >
    <!-- Сообщение -->
    <div
        class="relative max-w-xs px-4 py-2 rounded-lg transition-all hover:shadow-md group"
        :class="
        !isOutgoing
          ? 'bg-red-400  text-stone-50 rounded-br-none'
          : 'bg-gray-200 text-gray-900 rounded-bl-none'
      "
        @mouseenter="showActions = true"
        @mouseleave="showActions = false"
    >
      <!-- Хвостик (треугольник) -->
      <div
          class="absolute bottom-0 w-0 h-0"
          :class="!isOutgoing ? 'right-[-8px]' : 'left-[-8px]'"
          :style="
            !isOutgoing
              ? {
                  borderLeft: '8px solid rgb(248, 113, 113)',
                  borderTop: '8px solid transparent',
                }
              : {
                  borderRight: '8px solid rgb(229, 231, 235)',
                  borderTop: '8px solid transparent',
                }
          "
      />

      <!-- Текст сообщения -->
      <p class="text-[14px] break-words"

         :class="
        !isOutgoing
          ? 'text-stone-100 '
          : ' text-gray-900 '
      "
      >
        {{ message.content }}
      </p>

      <!-- Время и статус -->
      <div
          class="flex items-center gap-1 mt-1 text-lg"
      >
        <span>{{ formatMessageTime(message.created_at, 'time') }}</span>

        <span v-if="!isOutgoing" :title="message.status"
        >
          {{ getStatusIcon(message.status) }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import type {Message} from '~/features/LiveChat/types/chat'
import {formatMessageTime} from '~/features/LiveChat/utils/messageFormatter'

const props = defineProps<{
  message: Message
}>()

const emit = defineEmits<{
  delete: []
  retry: []
}>()

const showActions = ref(false)
const isOutgoing = computed(() => props.message.direction === 'outgoing')

const getStatusIcon = (status: Message['status']): string => {
  const icons: Record<Message['status'], string> = {
    sending: '⏱️',
    sent: '✓',
    delivered: '✓✓',
    read: '👁️',
    failed: '⚠️',
  }
  return icons[status] || '✓'
}

const handleDelete = () => {
  emit('delete')
}

const handleRetry = () => {
  emit('retry')
}
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.2s ease-out;
}
</style>