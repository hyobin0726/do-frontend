'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function getRegionNames() {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data.data

}