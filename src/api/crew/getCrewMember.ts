'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
export async function GetCrewMember({ crewId }: { crewId: string }) {
    const auth = await useGetServerToken()
    const res = await fetch(`${process.env.BASE_URL}/read-only-service/v1/users/crew/member/profiles/${crewId}`, {
        method: 'GET',
        headers: {
            Uuid: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        next: { tags: ['memberRefresh'] },
    })
    const data = await res.json()
    return data.data
}
