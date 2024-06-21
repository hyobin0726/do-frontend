'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'
import { revalidateTag } from 'next/cache'

export default async function putMyProfile(profileImageUrl: string, profileMessage: string) {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/member/profile`, {
        method: 'PUT',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profileImageUrl: profileImageUrl,
            profileMessage: profileMessage,
        }),
    })
    const data = await res.json()
    if (data.isSuccess) {
        revalidateTag('myProfile')
    }
    return data
}
