'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { revalidateTag } from 'next/cache'

export default async function postCrewAgree({ joinFormId }: { joinFormId: string }) {
    const auth = await useGetServerToken()
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/acceptance/join/${joinFormId}`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    if (data.isSuccess) {
        console.log('Member exit response:', data)
        revalidateTag('crewMemberRefresh')
    }
    console.log('data:', data)
    return data
}
