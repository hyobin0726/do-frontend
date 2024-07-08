'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { redirect } from 'next/navigation'

export async function deleteBoard(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${boardId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
        },
    })
    const data = await response.json()
    if (data.isSuccess) {
        redirect('/boardlist')
    }

    return data
}
