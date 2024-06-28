'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { error } from 'console'

export async function PostLike(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${boardId}/like`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
        },
    )
    const data = await response.json()
    if (data.isSuccess === true) {
        console.log('좋아요 성공', data)
    } else {
        console.error('좋아요 성공 에러.', error)
    }
    return data
}
