'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function getCrewBoardList(crewId: string, page: number) {
    const auth = await useGetServerToken()
    const res = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board/${crewId}/board-list?page=${page}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
        },
    )
    const data = await res.json()
    return data.data
}
