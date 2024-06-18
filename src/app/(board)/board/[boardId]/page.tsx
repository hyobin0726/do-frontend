import { useGetServerToken } from '@/actions/useGetServerToken'
import BoardComment from '@/components/pages/board/BoardComment'
import BoardImage from '@/components/pages/board/BoardImage'
import BoardLikeAndComment from '@/components/pages/board/BoardLikeAndComment'
import BoardProfile from '@/components/pages/board/BoardProfile'
import { BoardType } from '@/type/BoardType'

async function GetBoard(boardId: string) {
    const auth = await useGetServerToken()
    const response = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Uuid: `${auth.token}`,
        },
    })
    const data = await response.json()
    if (data.isSuccess === true) {
        console.log('게시글을 불러왔습니다.', data.data)
    } else {
        console.error('게시글을 불러오는데 실패했습니다.')
    }
    return data.data
}
export default async function Board({ params }: { params: { boardId: string } }) {
    const boardId: string = params.boardId
    console.log('boardId', boardId)
    const board: BoardType = await GetBoard(boardId)

    return (
        <main className="space-y-3 p-3 h-[calc(100dvh-110px)] overflow-y-scroll">
            <div className="flex items-center mb-4">
                <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
                <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
            </div>
            <div>
                <p>{board.content}</p>
            <div>
                <p>{board.content}</p>
            </div>
            <BoardImage imageUrls={board.imageUrls} />
            <BoardLikeAndComment />
            <BoardComment />
        </main>
    )
}
