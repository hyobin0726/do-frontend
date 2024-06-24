'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
export async function GetCrewJoinForm({ crewId }: { crewId: string }) {
    const auth = await useGetServerToken()
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/join-forms/${crewId}`, {
        method: 'GET',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        next: { tags: ['crewMemberRefresh'] },
    })
    const data = await res.json()
    return data.data
}
