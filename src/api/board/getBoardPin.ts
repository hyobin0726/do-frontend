'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function GetBoardPin(crewId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${crewId}/pinned`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Uuid: `${auth.token}`,
        },
    })
    const data = await response.json()
    if (data.isSuccess === true) {
        console.log('고정 게시글을 불러왔습니다.', data)
    } else {
        console.error('고정 게시글을 불러오는데 실패했습니다.')
    }
    return data.data
}
