'use client'
import { useState } from 'react'
import Album from '@/components/images/Album'
import CrewImage from '@/components/images/crewImage'
import Alert from '@/components/common/Alert'

export default function CrewImageUpload() {
    const [crewImage, setCrewImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>('')
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file.length > 0) {
            const selectedFile = file[0]
            if (selectedFile.type.startsWith('image/')) {
                setCrewImage(selectedFile)

                const ImgUrl = await uploadImageToS3(selectedFile)

                if (ImgUrl) {
                    setImageUrl(ImgUrl)
                }
            } else {
                setIsOpened(true)
            }
        }
    }
    return (
        <section className="flex justify-center">
            <div className="relative w-40 h-50">
                {crewImage ? (
                    <img src={URL.createObjectURL(crewImage)} alt="이미지 미리보기" />
                ) : (
                    <div>
                        <CrewImage />
                    </div>
                )}
                <div className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                    <label htmlFor="inputFile" className="cursor-pointer">
                        <div className="w-5">
                            <Album />
                        </div>
                    </label>
                    <input type="file" id="inputFile" className="hidden" onChange={imageHandler} />
                </div>
            </div>
            {imageUrl && <input type="hidden" name="profileUrl" value={imageUrl} />}
            {isOpened && (
                <Alert type="info" isAlertOpen={isOpened}>
                    <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        이미지 파일만 업로드 가능합니다.
                    </p>
                    <button
                        onClick={() => {
                            setIsOpened(false)
                        }}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    >
                        닫기
                    </button>
                </Alert>
            )}
        </section>
    )
}

async function uploadImageToS3(imageFile: File): Promise<string | null> {
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
