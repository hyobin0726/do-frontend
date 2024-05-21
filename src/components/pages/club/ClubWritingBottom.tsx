'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

function ClubWritingBottom() {
    const multiRef = useRef<HTMLInputElement>(null)
    const [multiImages, setMultiImages] = useState<Array<File>>([])

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

        if (multiImages.length === 5) {
            alert('이미지는 최대 5장까지만 업로드할 수 있습니다.')
        } else {
            multiRef.current?.click()
        }
    }

    const handleMultiImageDelete = (index: number) => {
        setMultiImages((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    return (
        <div className="flex absolute bottom-0  border-t-2 w-full bg-red-100">
            {multiImages.length > 0 && (
                <div className="flex p-2 space-x-2">
                    {multiImages?.map((file: File, index: number) => (
                        <div key={index} className="relative">
                            <div className="w-[50px] h-[50px]">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`이미지 미리보기 ${index + 1}`}
                                    fill
                                    sizes="50px"
                                />
                            </div>
                            <button
                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                onClick={() => handleMultiImageDelete(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="p-2">
                <label htmlFor="inputFile">
                    <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/forma-light-filled/24/image.png"
                        alt="이미지 업로드"
                    />
                </label>
                <input
                    type="file"
                    id="inputFile"
                    style={{ display: 'none' }}
                    multiple
                    ref={multiRef}
                    onChange={(e) => multiFileHandler(e)}
                />
            </div>
        </div>
    )
}
export default ClubWritingBottom
