'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function getChatOldMessage(crewId: string, page: number) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/history/${crewId}?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
        },
    })
    // const data = await response.json()
    // console.log(data.data)
    return response
}
