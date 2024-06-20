'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getRegionList() {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    return data.data
}
