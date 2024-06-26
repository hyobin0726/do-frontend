'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export async function getOtherProfile(OtherUuid: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/member/other-profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
            OtherUuid: `${OtherUuid}`,
        },
    })
    const data = await response.json()
    // console.log(data.data)
    return data
}
