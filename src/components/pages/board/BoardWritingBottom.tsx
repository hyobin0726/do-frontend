'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import BoardImageUpload from './BoardImageUpload'
import Alert from '@/components/common/Alert'

function BoardWritingBottom({ images }: { images: (images: File[]) => void }) {
    const multiRef = useRef<HTMLInputElement>(null)
    const [multiImages, setMultiImages] = useState<Array<File>>([])
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const multiFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from((event.target as HTMLInputElement).files as FileList)

        const existingFileNames = new Set(multiImages.map((file) => file.name))
        const currentImageCount = multiImages.length
        const maxImageCount = 5

        const newFiles = uploadedFiles
            .filter((file) => file.type.includes('image'))
            .filter((file) => !existingFileNames.has(file.name))
            .slice(0, maxImageCount - currentImageCount)

        setMultiImages((prevFiles) => [...prevFiles, ...newFiles])
        images([...multiImages, ...newFiles])

        if (multiImages.length === 5) {
            setIsAlertOpen(true)
        } else {
            multiRef.current?.click()
        }
    }

    const handleMultiImageDelete = (index: number) => {
        setMultiImages((prevFiles) => prevFiles.filter((_, i) => i !== index))
        images(multiImages.filter((_, i) => i !== index))
    }

    return (
        <div className="flex absolute bottom-0  border-t-[1px] w-full p-2 space-x-2 border-hobbing-gray  overflow-x-scroll">
            {multiImages.length > 0 && (
                <div className="flex space-x-2 ">
                    {multiImages?.map((file: File, index: number) => (
                        <div key={index} className="relative">
                            <div className="w-[60px] h-[60px] ">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`이미지 미리보기 ${index + 1}`}
                                    fill
                                    sizes="50px"
                                />
                            </div>
                            <button
                                className="absolute top-0 right-0 p-1 bg-hobbing-red text-white rounded-full"
                                onClick={() => handleMultiImageDelete(index)}
                            >
                                <div className="text-xs">X</div>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="w-16 h-[65px] border-[1px] border-hobbing-red rounded-xl flex-col flex justify-center items-center">
                <BoardImageUpload multiRef={multiRef} multiFileHandler={multiFileHandler} />
                <div className=" text-hobbing-pink text-sm">{multiImages.length} / 5</div>
            </div>
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
        </div>
    )
}
export default BoardWritingBottom
