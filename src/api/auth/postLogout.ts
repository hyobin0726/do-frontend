'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function postLogout() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/logout`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    return data.isSuccess
}
