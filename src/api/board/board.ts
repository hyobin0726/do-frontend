'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function GetBoard(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
        },
    })
    const data = await response.json()

    return data.data
}
