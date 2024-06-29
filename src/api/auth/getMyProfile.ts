'use server'
export default async function getMyProfile(token: string | undefined) {

    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/member/profile`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
        next: { tags: ['myProfile'] },
    })
    const data = await res.json()
    if(!data.isSuccess) return null
    return data.data
}
