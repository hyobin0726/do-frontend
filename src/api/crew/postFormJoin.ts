'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'
import { revalidateTag } from 'next/cache'

interface crewJoinFormtype {
    joinMessage: string
    profileUrl: string
    name: string
    birthday: string
    address: string
    gender: string
}

export default async function postFormJoin(crewId: number, joinInfo: crewJoinFormtype) {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/submission/join-form/${crewId}`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinInfo),
    })
    const data = await res.json()
    console.log(data)
    if (data.isSuccess) {
        revalidateTag('suggestionCrewList')
    }
    return data
}
