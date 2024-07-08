'use server'
export default async function getNewCrew(hobbyId: number, regionId: number, token: string | undefined) {

    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/latest/list/${hobbyId}/${regionId}`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    if(!data.isSuccess) return null
    return data
}
