'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import BoardContent from '@/components/pages/board/BoardContent'
import BoardWritingBottom from '@/components/pages/board/BoardWritingBottom'
import BoardWritingNav from '@/components/pages/board/BoardWritingNav'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Alert from '@/components/common/Alert'
import BoardwritingSelect from '@/components/pages/board/BoardwritingSelect'
function BoardWriting({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId
    const auth = useGetClientToken()
    const router = useRouter()
    const [content, setContent] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const handleContent = (content: string) => {
        setContent(content)
    }
    const handleImages = (images: File[]) => {
        setImages(images)
    }
    const uploadImageToS3 = async (imageFile: File): Promise<string | null> => {
        const formData = new FormData()
        formData.append('img', imageFile)

        try {
            const response = await fetch('/api/s3-upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            if (response.ok && data.message === 'OK') {
                console.log('이미지 저장 완료', data.imgUrl)
                return data.imgUrl
            } else {
                console.error('이미지 저장 실패:', data.error)
                return null
            }
        } catch (error) {
            console.error('네트워크 에러:', error)
            return null
        }
    }
    const handleUpload = async () => {
        if (content.trim().length === 0) {
            setIsAlertOpen(true)
            return
        }

        const uploadedImageUrls: string[] = []

        for (const image of images) {
            const imageUrl = await uploadImageToS3(image)
            if (imageUrl === null) {
                console.error('이미지 URL을 가져오는데 실패했습니다.')
                return
            }
            uploadedImageUrls.push(imageUrl)
        }

        const bodyData = {
            content: content,
            imageUrls: uploadedImageUrls,
        }
        try {
            const response = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${crewId}`, {
                method: 'POST',
                headers: {
                    Uuid: `${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            })
            const responseData = await response.json()
            if (responseData.isSuccess === true) {
                console.log('게시글 작성 완료')
                router.push(`/board/`)
            } else {
                console.error('게시글 작성 실패:')
            }
            console.log('전송한 데이터:', bodyData)
        } catch (error) {
            console.error('네트워크 에러:', error)
        }
    }

    return (
        <>
            <BoardWritingNav handleUpload={handleUpload} />
            <BoardwritingSelect />
            <BoardContent contents={handleContent} />
            <BoardWritingBottom images={handleImages} />
            {isAlertOpen && (
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
            )}
        </>
    )
}
export default BoardWriting
