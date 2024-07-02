'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import BoardImageUpload from './BoardImageUpload'
import Alert from '@/components/common/Alert'

// S3 업로드 API 호출 함수
const uploadImageToS3 = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('img', file)

    try {
        const response = await fetch('/api/s3-upload', {
            method: 'POST',
            body: formData,
        })
        const result = await response.json()
        return result.imgUrl // S3 URL 반환
    } catch (error) {
        console.error('S3 업로드 오류:', error)
        return null
    }
}

function BoardWritingBottom({ boardImage }: { boardImage: string[] }) {
    // console.log(boardImage)
    const multiRef = useRef<HTMLInputElement>(null)
    const [multiImages, setMultiImages] = useState<Array<File>>([])
    const [imageUrls, setImageUrls] = useState<string[]>(boardImage || []) // 이미지 URL을 저장할 상태
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    // console.log(imageUrls)
    const multiFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from((event.target as HTMLInputElement).files as FileList)
        const existingFileNames = new Set(multiImages.map((file) => file.name))
        const currentImageCount = multiImages.length
        const maxImageCount = 5

        const newFiles = uploadedFiles
            .filter((file) => file.type.includes('image'))
            .filter((file) => !existingFileNames.has(file.name))
            .slice(0, maxImageCount - currentImageCount)

        // S3에 이미지를 업로드하고 URL을 받아옴
        const newFileUrls = await Promise.all(newFiles.map((file) => uploadImageToS3(file)))

        // 유효한 URL만 필터링
        const validUrls = newFileUrls.filter((url) => url !== null) as string[]

        setMultiImages((prevFiles) => [...prevFiles, ...newFiles])
        setImageUrls((prevUrls) => [...prevUrls, ...validUrls])

        if (multiImages.length + newFiles.length >= maxImageCount) {
            setIsAlertOpen(true)
        }
    }
    const handleMultiImageDelete = (index: number) => {
        setMultiImages((prevFiles) => prevFiles.filter((_, i) => i !== index))
        setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index))
    }

    return (
        <div className="flex absolute bottom-5 border-t-[1px] w-full p-3 space-x-2 border-hobbing-gray overflow-x-scroll">
            {imageUrls.length < 5 && (
                <div className="w-[60px] h-[60px] border-[1px] border-hobbing-red rounded-xl flex-col flex justify-center items-center">
                    <BoardImageUpload multiRef={multiRef} multiFileHandler={multiFileHandler} />
                    <div className="text-hobbing-pink text-sm">{imageUrls ? imageUrls.length : 0} / 5</div>
                </div>
            )}
            {imageUrls && (
                <div className="flex space-x-2">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <div className="w-[60px] h-[60px]">
                                {boardImage &&
                                    (index < boardImage.length ? (
                                        <Image src={url} alt={`기존 이미지 미리보기 ${index + 1}`} fill sizes="50px" />
                                    ) : (
                                        <Image
                                            src={URL.createObjectURL(multiImages[index - boardImage.length])}
                                            alt={`새 이미지 미리보기 ${index + 1}`}
                                            fill
                                            sizes="50px"
                                        />
                                    ))}
                            </div>
                            <button
                                className="absolute top-0 right-0 w-5 h-5 bg-white flex justify-center items-center rounded-full"
                                onClick={() => handleMultiImageDelete(index)}
                            >
                                <div className="text-hobbing-red text-xs font-bold">X</div>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        이미지는 5개까지 업로드 가능합니다.
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
            <input type="hidden" name="imageUrls" value={imageUrls?.join(',')} />
        </div>
    )
}

export default BoardWritingBottom
