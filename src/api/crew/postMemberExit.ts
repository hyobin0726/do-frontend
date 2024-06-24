'use server'

import { revalidateTag } from 'next/cache'
import { useGetServerToken } from '@/actions/useGetServerToken'
export async function postMemberExit({ crewId, outUuid }: { crewId: string; outUuid: string }) {
    const auth = await useGetServerToken()
    const bodyData = {
        outUuid: `${outUuid}`,
    }
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/forced-exit/${crewId}`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    })
    const data = await res.json()
    if (data.isSuccess) {
        console.log('Member exit response:', data)
        revalidateTag('memberRefresh')
    }
    console.log('data:', data)
    return data
}
