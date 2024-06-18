'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export const getCrewBoardList = async (crewId: string) => {
    const auth = await useGetServerToken()
    // console.log(crewId, auth, page)
    const res = await fetch(
        `${process.env.BASE_URL}/board-service/v1/users/crew/board/${crewId}/board-list?page=0&size=3`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Uuid: `${auth.token}`,
            },
        },
    )

    const data = await res.json()
    console.log(data.data)
    return data.data
}
