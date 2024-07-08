'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getMyJoinForms() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/my-join-forms`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        next: { tags: ['myJoinForms'] },
    })
    const data = await res.json()
    return data.data
}
