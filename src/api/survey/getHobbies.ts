'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'


export default async function getHobbies() {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/hobbies`, {
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data.data
}
