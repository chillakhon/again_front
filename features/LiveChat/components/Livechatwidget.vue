<template>
  <div class="fixed bottom-[60px] right-3 z-50 font-sans">

    <SelectChat
        v-if="!isOpen"
        @open-chat="handleToggle"
    />

    <Transition name="slide-fade">

      <div
          v-if="isOpen"
          class="absolute bottom-0 right-0  rounded-lg flex flex-col overflow-hidden shadow-md
             min-w-[340px] max-h-[500px] min-h-[450px] max-w-[450px]"
      >

        <!-- Loading state -->
        <div v-if="isLoading" class="flex-1 flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p class="text-gray-600">Загрузка...</p>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="inputError" class="flex-1 flex items-center justify-center bg-red-50 px-4">
          <div class="text-center">
            <p class="text-red-600 text-sm">{{ inputError }}</p>
            <button
                @click="handleRetry"
                class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
            >
              Повторить
            </button>
          </div>
        </div>

        <!-- Chat loaded state -->
        <template v-else>

          <ChatHeader
              :conversation="conversation"
              @close="handleClose"
              @minimize="handleMinimize"
          />
          <ChatMessages :messages="messages"/>
          <ChatInput
              @send="handleSendMessage"
              :disabled="isSending"
              :loading="isSending"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, watch} from 'vue'
import {useLiveChatStore} from '~/features/LiveChat/stores/useLiveChatStore'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import {getExternalIdClient} from "~/features/LiveChat/composables/useChatFunctions";
import {usePublicConversationEvents} from "~/features/LiveChat/composables/usePublicConversationEvents";
import SelectChat from "~/features/LiveChat/components/SelectChat.vue";

const store = useLiveChatStore()

const authUser = useAuthStore()

const isOpen = computed(() => store.isOpen)
const isLoading = computed(() => store.isLoading)
const isSending = computed(() => store.isSending)
const inputError = computed(() => store.inputError)
const conversation = computed(() => store.conversation)
const messages = computed(() => store.messages)


// Инициализация при монтировании
onMounted(async () => {
  // Генерируем или получаем external_id
  let externalId = await getExternalIdClient()

  const userId = authUser.user.id ?? null

  // Устанавливаем информацию о клиенте
  store.setClientInfo(Number(userId), externalId)

  // Загружаем или создаём conversation
  await store.fetchOrCreateConversation()

  // Отмечаем как прочитанный при открытии
  if (conversation.value) {
    store.setUnreadCountFronLS()
  }

  if (conversation.value?.id) {
    const events = usePublicConversationEvents(conversation.value.id)
    events?.subscribeToEvents()
  }

})


// Отмечаем как прочитанное при открытии
watch(isOpen, async (newVal) => {
  if (newVal && conversation.value) {
    await store.markAsRead()
    store.resetUnreadCount()
  }
})


const handleToggle = () => {
  store.toggleChat()
}

const handleClose = () => {
  store.closeChat()
}

const handleMinimize = () => {
  store.closeChat()
}

const handleSendMessage = async (content: string) => {
  await store.sendMessage(content)
}

const handleRetry = async () => {
  if (!isLoading.value && !isSending.value) {
    await store.fetchOrCreateConversation()
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  animation: slide-in-right 0.3s ease-out;
}

.slide-fade-leave-active {
  animation: slide-out-right 0.2s ease-in;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>