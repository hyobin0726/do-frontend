'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getMyProfile() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/member/profile`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        next: { tags: ['myProfile'] },
    })
    const data = await res.json()
    return data.data
}
