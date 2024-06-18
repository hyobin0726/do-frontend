'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function putRegion(
    regionId: number,
    addressName: string,
    legalCode: number,
    latitude: number,
    longitude: number,
    currentSelectedRange: number,
) {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/${regionId}`, {
        method: 'PUT',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            addressName: addressName,
            legalCode: legalCode,
            latitude: latitude,
            longitude: longitude,
            currentSelectedRange: currentSelectedRange,
        }),
    })
    const data = await res.json()
    return data
}
