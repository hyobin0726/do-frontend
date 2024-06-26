'use server'
import { useGetServerToken } from './useGetServerToken'

export async function createCrewFormAction(formData: FormData) {
    const auth = await useGetServerToken()
    const hashTagList = formData.get('hashTagList') as string | null
    const payload = {
        profileUrl: formData.get('profileUrl') || null,
        regionId: parseInt(formData.get('regionId') as string),
        hobbyId: parseInt(formData.get('hobbyId') as string),
        name: formData.get('crewName'),
        introduction: formData.get('introduction'),
        hashTagList: hashTagList ? hashTagList.split(',') : [],
        joinType: parseInt(formData.get('joinType') as string),
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
            },
            body: JSON.stringify(payload),
        })

        const responseData = await response.json()

        if (response.ok && responseData.isSuccess) {
            console.log('크루 생성 완료 응답 데이터:', responseData)
            return responseData
        } else {
            console.error('크루 생성 실패:', responseData.message)

            return responseData
        }
    } catch (error) {
        console.error('에러:', error)
    }
}
