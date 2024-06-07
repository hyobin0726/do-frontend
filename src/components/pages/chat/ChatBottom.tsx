'use client'
import Album from '@/components/images/Album'
import Emoticon from '@/components/images/Emoticon'
import Send from '@/components/images/Send'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ChatBottom() {
    const params = useParams<{ crewId: string }>()
    const [previewImg, setPreviewImg] = useState<FileList>()
    const [message, setMessage] = useState<string>('')
    const [imgUrl, setImgUrl] = useState<string | null>(null)
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
                setImgUrl(result.imgUrl)
                // alert('이미지가 저장되었습니다.')
                handleSendMsg(result.imgUrl)
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

    const handleSendMsg = async (imgUrl: string | null) => {
        const trimmedMessage = message.trim()

        if (!trimmedMessage && !imgUrl) return

        const bodyData = {
            crewId: `${params.crewId}`,
            text: trimmedMessage || null,
            imageUrl: imgUrl,
        }

        try {
            const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    uuid: 'uuid1',
                },
                body: JSON.stringify(bodyData),
            })

            if (response.ok) {
                console.log('Message sent to server successfully')
            } else {
                console.error('Failed to send message to server')
            }
        } catch (error) {
            console.error('Error sending message to server:', error)
        }
        setMessage('')
        setImgUrl(null)
    }

    return (
        <div>
            <form className=" bottom-0 z-[1] fixed  h-[125px]">
                <div className=" w-screen ">
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        name="message"
                        className="p-2 w-full h-20"
                        autoFocus
                    />
                </div>
                <div className="flex justify-between items-center px-2 py-1">
                    <div className="flex items-center space-x-1">
                        <div>
                            <label htmlFor="inputFile">
                                <div className="w-5">
                                    <Album />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="inputFile"
                                style={{ display: 'none' }}
                                onChange={(e) => fileHandler(e)}
                            />
                        </div>
                        <div className="w-5">
                            <Emoticon />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleSendMsg(null)}
                        className="w-7 h-7 bg-hobbing-red rounded-full flex items-center justify-center"
                    >
                        <div className="w-5">
                            <Send />
                        </div>
                    </button>
                </div>
            </form>

            <div>
                {previewImg && (
                    <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30 z-[1]">
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
                                <button className=" bg-gray-500 text-white rounded p-2" onClick={saveHandler}>
                                    1개 전송
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
