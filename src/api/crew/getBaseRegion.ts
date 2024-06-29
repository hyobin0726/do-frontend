'use server'
export default async function getBaseRegion(token: string | undefined) {

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/base-address-name`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    if(!data.isSuccess) return null
    return data.data
}
