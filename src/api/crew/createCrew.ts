'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'
export async function handleCreateCrew(rowFormData: any) {
    const auth = await useGetServerToken()

    try {
        const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
            body: JSON.stringify(rowFormData),
        })

        const responseData = await response.json()

        if (response.ok && responseData.isSuccess) {
            console.log('크루 생성 완료 응답 데이터:', responseData)
            return
        } else {
            console.error('크루 생성 실패:', responseData.message)

            return
        }
    } catch (error) {
        console.error('에러:', error)
    }
}
