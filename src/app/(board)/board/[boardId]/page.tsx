import { GetBoard } from '@/api/board/board'
import { GetBoardComment } from '@/api/board/boardcomment'
import BoardComment from '@/components/pages/board/BoardComment'
import BoardImage from '@/components/pages/board/BoardImage'
import BoardLikeAndComment from '@/components/pages/board/BoardLikeAndComment'
import BoardProfile from '@/components/pages/board/BoardProfile'
import { BoardType } from '@/type/BoardType'

export default async function Board({ params }: { params: { boardId: string } }) {
    const boardId: string = params.boardId
    // console.log('boardId', boardId)
    const board: BoardType = await GetBoard(boardId)
    const comment = await GetBoardComment(boardId, 0)
    return (
        <main className="space-y-3 p-3 h-[calc(100dvh-110px)] overflow-y-scroll">
            <div className="flex items-center mb-4">
                <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
            </div>
            <div>
                <p>{board.content}</p>
            </div>
            <BoardImage imageUrls={board.imageUrls} />
            {/* <BoardLikeAndComment /> */}
            <BoardComment boardId={boardId} data={comment.commentList} lastPage={comment.isLast} />
        </main>
    )
}
