'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export const GetBoardComment = async (boardId: string, page: number) => {
    const auth = await useGetServerToken()
    const res = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${boardId}/comment-list?page=${page}&size=2`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Uuid: `${auth.token}`,
            },
        },
    )
    const data = await res.json()
    return data.data
}
