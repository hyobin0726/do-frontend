'use server'
export default async function getHobbyCards(token: string | undefined) {
    const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/hobby-cards`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    if(!data.isSuccess) return null
    return data.data
}
