'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getMyInfomation() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/member/signup`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    return data.data
}
