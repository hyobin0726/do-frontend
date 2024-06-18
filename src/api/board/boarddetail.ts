'use server'
import { useGetServerToken } from '@/actions/useGetServerToken'

export async function GetBoardDetail(boardId: string) {
    const auth = await useGetServerToken()
    const data = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Uuid: `${auth.token}`,
        },
    })
    const response = await data.json()
    if (response.isSuccess === true) {
        console.log('게시글을 불러왔습니다.', response.data)
    }
    return response.data
}
