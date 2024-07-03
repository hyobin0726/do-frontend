'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export async function getChatList() {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/latest/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
        },
    })
    const data = await response.json()
    return data
}
