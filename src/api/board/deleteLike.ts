'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { error } from 'console'

export async function DeleteLike(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${boardId}/like`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
        },
    )
    const data = await response.json()
    if (data.isSuccess === true) {
        console.log('좋아요 삭제.', data)
    } else {
        console.error('좋아요 삭제 에러', error)
    }
    return data
}
