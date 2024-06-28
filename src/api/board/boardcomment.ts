'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export const GetBoardComment = async (boardId: string, page: number) => {
    const auth = await useGetServerToken()
    const res = await fetch(
        `${process.env.BASE_URL}/read-only-service/v1/users/crew/board/${boardId}/comment-list?page=${page}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
            next: { tags: ['comment'] },
        },
    )
    const data = await res.json()
    return data.data
}
