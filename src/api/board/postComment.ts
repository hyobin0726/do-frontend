'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function PostComment(boardId: string, bodyData: { content: string }) {
    const auth = await useGetServerToken()
    try {
        const response = await fetch(
            `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${boardId}/comment`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Uuid: `${auth.token}`,
                },
                body: JSON.stringify(bodyData),
            },
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.error('네트워크 에러:', error)
        return null
    }
}
