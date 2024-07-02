import { PostBoard } from '@/api/board/postBoard'
import { PutBoard } from '@/api/board/putBoard'
import { ReadBoard } from '@/api/board/readBoard'
import { getCrewList } from '@/api/crew/CrewList'
import BoardContent from '@/components/pages/board/BoardContent'
import BoardWritingBottom from '@/components/pages/board/BoardWritingBottom'
import BoardWritingNav from '@/components/pages/board/BoardWritingNav'
import BoardwritingSelect from '@/components/pages/board/BoardwritingSelect'
import { BoardType } from '@/type/BoardType'
import { CrewType } from '@/type/CrewType'
import { redirect } from 'next/navigation'

export default async function BoardModify({ params }: { params: { boardId: string } }) {
    const boardId: string = params.boardId
    const board: BoardType = await ReadBoard(boardId)
    const crewList: CrewType[] = await getCrewList()
    // console.log(board)

    async function handlePostBoard(formData: FormData) {
        'use server'
        // const crewId = formData.get('crewId')
        const content = formData.get('content')
        const imageUrls = formData.get('imageUrls') as string | null

        const parsedImageUrls = imageUrls ? imageUrls.split(',') : []

        const rowFormData = {
            content,
            imageUrls: parsedImageUrls,
        }
        // console.log(rowFormData)

        const response = await PutBoard(boardId as string, rowFormData)
        if (response.isSuccess === true) {
            console.log('게시글 작성 완료')
            redirect(`/boardlist`)
        } else {
            console.error('게시글 작성 실패:')
        }
    }
    return (
        <form action={handlePostBoard}>
            <BoardWritingNav />
            {/* <BoardwritingSelect crewList={crewList} crewId={board.crewId} /> */}
            <BoardContent boardContent={board.content} />
            <BoardWritingBottom boardImage={board.imageUrls} />
        </form>
    )
}
