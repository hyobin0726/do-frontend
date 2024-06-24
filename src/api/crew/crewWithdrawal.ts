'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function crewWithdrawal(crewId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/withdrawal/${crewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${auth.token}`,
        },
    })

    const responseData = await response.json()
    return responseData
}
