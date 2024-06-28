'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getLatestBoard(crewId: number) {
    const auth = await useGetServerToken()

    const response = await fetch(
        `${process.env.BASE_URL}/read-only-service/v1/users/crew/board/${crewId}/latest-board`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
        },
    )

    const data = await response.json()

    return data.data
}
