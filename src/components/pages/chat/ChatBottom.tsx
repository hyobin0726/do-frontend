'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export default function ChatBottom() {
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
        setPreviewImg(undefined)
    }
    const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file.length > 0) {
            setPreviewImg(file)
        }
    }

    return (
        <>
            <form className=" absolute bottom-0 h-12 flex w-full p-1 bg-gray-300">
                <div className="p-1">
                    <label htmlFor="inputFile">
                        <img
                            width="30"
                            src="https://img.icons8.com/forma-light-filled/24/image.png"
                            alt="이미지 업로드"
                        />
                    </label>
                    <input type="file" id="inputFile" style={{ display: 'none' }} onChange={(e) => fileHandler(e)} />
                </div>

                <div className="flex-grow">
                    <input type="text" className="p-2 flex-grow rounded-xl w-full" placeholder="메시지를 입력하세요." />
                </div>
                <button className=" p-1">
                    <img width="25" src="https://img.icons8.com/ios-filled/50/sent.png" alt="전송" />
                </button>
            </form>
            <div>
                {previewImg && (
                    <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30">
                        <div className="p-4 bg-white w-3/5 rounded-lg">
                            <p className="flex justify-center font-bold ">파일전송</p>
                            <div className="flex">
                                <Image
                                    src={URL.createObjectURL(previewImg[0])}
                                    alt="이미지 미리보기"
                                    width={70}
                                    height={70}
                                />
                                <div className="ml-3 py-5">
                                    <p>{previewImg[0].name}</p>
                                    <p> {Math.round(previewImg[0].size / 1024)}KB</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full space-x-2 mt-2">
                                <button className=" rounded p-2 border-2" onClick={() => setPreviewImg(undefined)}>
                                    취소
                                </button>
                                <button className=" bg-gray-500 text-white rounded p-2" onClick={() => saveHandler()}>
                                    1개 전송
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
