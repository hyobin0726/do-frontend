'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export default function S3UploadForm() {
    const [previewImg, setPreviewImg] = useState<FileList>()

    const saveHandler = async () => {
        if (!previewImg) {
            return
        }

        const formData = new FormData()
        formData.append('img', previewImg[0])

        try {
            const result = await fetch('/api/s3-upload', {
                method: 'POST',
                body: formData,
            }).then((res) => res.json())

            if (result.message == 'OK') {
                alert('이미지가 저장되었습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file.length > 0) {
            setPreviewImg(file)
        }
    }

    return (
        <>
            <div>
                <form>
                    <input type="file" onChange={(e) => fileHandler(e)} />

                    {previewImg && (
                        <Image
                            src={URL.createObjectURL(previewImg[0])}
                            alt="이미지 미리보기"
                            width={100}
                            height={100}
                        />
                    )}

                    <button type="button" onClick={() => saveHandler()}>
                        저장하기
                    </button>
                </form>
            </div>
        </>
    )
}
