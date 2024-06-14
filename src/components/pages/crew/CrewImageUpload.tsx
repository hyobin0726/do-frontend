'use client'
import { useState, useEffect } from 'react'
import Album from '@/components/images/Album'
import CrewImage from '@/components/images/crewImage'

export default function CrewImageUpload() {
    const [crewImage, setCrewImage] = useState<File | null>(null)

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file.length > 0) {
            const selectedFile = file[0]
            if (selectedFile.type.startsWith('image/')) {
                setCrewImage(selectedFile)
            } else {
                alert('이미지 파일만 업로드할 수 있습니다.')
            }
        }
    }

    useEffect(() => {
        if (crewImage) {
            console.log('업로드된 파일 이름:', crewImage.name)
        }
    }, [crewImage])

    return (
        <div>
            <div className="relative w-40 h-50">
                {crewImage ? (
                    <img src={URL.createObjectURL(crewImage)} alt="업로드된 이미지 미리보기" />
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
        </div>
    )
}
