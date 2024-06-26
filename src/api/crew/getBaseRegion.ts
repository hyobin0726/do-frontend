'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getBaseRegion() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/base-address-name`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    return data.data
}
