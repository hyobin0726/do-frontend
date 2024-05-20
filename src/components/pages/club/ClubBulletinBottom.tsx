'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

function ClubBulletinBottom() {
    const multiRef = useRef<HTMLInputElement>(null)
    const [multiImages, setMultiImages] = useState<Array<File>>([])

    const multiFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = (event.target as HTMLInputElement).files

        const existingFileNames = new Set(multiImages.map((file) => file.name))

        const newFiles = Array.from(uploadedFiles as FileList)
            .filter((file) => file.type.includes('image'))
            .filter((file) => !existingFileNames.has(file.name))

        setMultiImages((prevFiles) => [...prevFiles, ...newFiles])
    }
    const handleMultiImageDelete = (index: number) => {
        setMultiImages((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
    console.log(multiImages)
    return (
        <div className="flex absolute bottom-0  border-t-2 w-full">
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
export default ClubBulletinBottom
