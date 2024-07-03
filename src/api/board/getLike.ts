'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function GetLike(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${boardId}/like`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
        },
    )
    const data = await response.json()
    if (!data.isSuccess) {
        console.error('좋아요 불러오는데 실패했습니다.')
    }
    return data
}
