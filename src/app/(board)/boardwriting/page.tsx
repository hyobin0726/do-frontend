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
        console.log(rowFormData)

        const response = await PostBoard(crewId as string, rowFormData)
        if (response.isSuccess === true) {
            console.log('게시글 작성 완료')
            redirect('/boardlist')
        } else {
            console.error('게시글 작성 실패:')
        }
    }

    return (
        <form action={handlePostBoard}>
            <BoardWritingNav />
            <BoardwritingSelect crewList={crewList} />
            <BoardContent />
            <BoardWritingBottom />
        </form>
    )
}
{
    /* {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        내용을 입력해주세요.
                    </p>
                    <button
                        onClick={() => {
                            setIsAlertOpen(false)
                        }}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    >
                        닫기
                    </button>
                </Alert>
            )} */
}
