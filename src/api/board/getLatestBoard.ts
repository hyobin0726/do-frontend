'use server'

export default async function getLatestBoard(crewId: number, token: string | undefined) {
    const response = await fetch(
        `${process.env.BASE_URL}/read-only-service/v1/users/crew/board/${crewId}/latest-board`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        },
    )

    const data = await response.json()

    return data.data
}
