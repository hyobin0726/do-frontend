import BoardwritingSelect from '@/components/pages/board/BoardwritingSelect'
import { getCrewList } from '@/api/crew/CrewList'
import { CrewType } from '@/type/CrewType'
import BoardContent from '@/components/pages/board/BoardContent'
import BoardWritingNav from '@/components/pages/board/BoardWritingNav'
import BoardWritingBottom from '@/components/pages/board/BoardWritingBottom'
import { PostBoard } from '@/api/board/postBoard'
import { redirect } from 'next/navigation'

export default async function BoardWriting() {
    const crewList: CrewType[] = await getCrewList()

    async function handlePostBoard(formData: FormData) {
        'use server'
        const crewId = formData.get('crewId')
        const content = formData.get('content')
        const imageUrls = formData.get('imageUrls') as string | null

        const parsedImageUrls = imageUrls ? imageUrls.split(',') : []

        const rowFormData = {
            content,
            imageUrls: parsedImageUrls,
        }

        const response = await PostBoard(crewId as string, rowFormData)
        if (response.isSuccess === true) {
            redirect('/boardlist')
        } else {
            console.error('게시글 작성 실패:')
        }
    }

    return (
        <form action={handlePostBoard}>
            <BoardWritingNav />
            <BoardwritingSelect crewList={crewList} crewId="" />
            <BoardContent boardContent="" />
            <BoardWritingBottom boardImage={[]} />
        </form>
    )
}
