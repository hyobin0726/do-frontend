'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { revalidateTag } from 'next/cache'

export async function deleteComment(commentId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users//crew/board-interaction/${commentId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Uuid: `${auth.token}`,
            },
        },
    )
    const data = await response.json()
    if (data.isSuccess) {
        console.log('comment delete response:', data)
        revalidateTag('comment')
    }

    return data
}
