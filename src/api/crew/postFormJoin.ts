'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function postFormJoin(crewId: number) {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/submission/join-form/${crewId}`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    console.log(data)
    return data
}
