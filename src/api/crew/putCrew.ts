'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function PutCrew(rowFormData: any, crewId: string) {
    const auth = await useGetServerToken()

    try {
        const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/${crewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
            body: JSON.stringify(rowFormData),
        })

        const responseData = await response.json()

        if (response.ok && responseData.isSuccess) {
            return
        } else {
            console.error('크루 수장 실패:', responseData.message)
            return
        }
    } catch (error) {
        console.error('에러:', error)
    }
}
