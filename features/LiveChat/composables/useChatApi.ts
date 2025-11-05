import type {Conversation, Message} from '~/features/LiveChat/types/chat'
import useApi from '~/composables/useApi'

export async function useGetOrCreateConversation(
    externalId: string | number,
    clientId?: number | null,
    source: 'web_chat' | 'telegram' | 'vk' | 'whatsapp' = 'web_chat'
) {
    const params = new URLSearchParams()

    if (clientId) {
        params.append('client_id', String(clientId))
    }

    params.append('source', source)
    params.append('external_id', String(externalId))

    const queryString = params.toString()
    const url = `/public/conversations/client${queryString ? '?' + queryString : ''}`

    return useApi<{
        data: Conversation,
        error: Error
    }>(url, {
        method: 'GET',
    })
}

export async function useSendMessage(
    conversationId: number | string,
    content: string
) {
    const url = `/public/conversations/${conversationId}/reply`

    return useApi<{
        data: Message,
    }>(url, {
        method: 'POST',
        body: JSON.stringify({
            content: content,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}


export async function useMarkConversationAsRead(
    conversationId: number | string
) {
    const url = `/public/conversations/${conversationId}/read`

    return useApi<{ success: boolean }>(url, {
        method: 'POST',
    })
}