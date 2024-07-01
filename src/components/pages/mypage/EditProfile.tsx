'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import RightArrow from '@/components/images/RightArrow'
import ErrorMark from '@/components/images/ErrorMark'
import putMyProfile from '@/api/auth/putMyProfile'
import Alert from '@/components/common/Alert'

interface ProfileType {
    prevProfilData: {
        profileImageUrl: string
        name: string
        profileMessage: string
        birth: string
        gender: string
    }
}

export default function EditProfile({ prevProfilData }: ProfileType) {
    const deFaultProfileImageUrl =
        'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718266148717_Frame%201000004039.png'

    const [profileImageUrl, setProfileImageUrl] = useState<string>(prevProfilData.profileImageUrl)
    const [profileMessage, setProfileMessage] = useState<string>(prevProfilData.profileMessage)
    const [localProfileImage, setLocalProfileImage] = useState<File | null>(null)
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [profileMessageLength, setProfileMessageLength] = useState<number>(prevProfilData.profileMessage.length)

    const router = useRouter()

    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file.length > 0) {
            const selectedFile = file[0]
            if (selectedFile.type.startsWith('image/')) {
                // 임시로 로컬 이미지 URL을 설정하여 사용자에게 미리보기를 제공합니다.
                setLocalProfileImage(selectedFile)

                const ImgUrl = await uploadImageToS3(selectedFile)

                if (ImgUrl) {
                    // 실제 업로드된 이미지 URL로 업데이트합니다.
                    setProfileImageUrl(ImgUrl)
                }
            } else {
                setIsOpened(true)
            }
        }
    }

    const handleProfileImageDelete = () => {
        setLocalProfileImage(null)
        setProfileImageUrl(deFaultProfileImageUrl)
    }

    const handleProfileMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProfileMessage(e.target.value.replace(/\n/g, ' '))
        setProfileMessageLength(e.target.value.trim().length)
    }

    const handleProfileEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await putMyProfile(profileImageUrl.trim(), profileMessage)
        if (data.isSuccess) {
            router.push('/mypage')
        }
    }

    return (
        <>
            <main className="w-full h-[calc(100dvh-60px)] px-10 flex flex-col items-center">
                <section className="w-full h-[50%] flex flex-col justify-end items-center space-y-3 pb-5">
                    <div className="relative">
                        <div className="w-[200px] h-[200px] overflow-hidden flex justify-center items-center rounded-full">
                            {localProfileImage ? (
                                <Image
                                    src={URL.createObjectURL(localProfileImage)}
                                    alt="이미지 미리보기"
                                    width={200}
                                    height={200}
                                    priority={true}
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                    }}
                                />
                            ) : (
                                <Image
                                    src={profileImageUrl}
                                    alt="profile image"
                                    width={200}
                                    height={200}
                                    priority={true}
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                    }}
                                />
                            )}
                        </div>
                        {deFaultProfileImageUrl !== profileImageUrl ? (
                            //이미지 삭제 == 기존 url을 default로 변경
                            <div
                                onClick={handleProfileImageDelete}
                                className="absolute top-[15px] right-[15px]  bg-hobbing-red w-[30px] h-[30px] flex justify-center items-center rounded-full p-1"
                            >
                                <ErrorMark color="#ffffff" />
                            </div>
                        ) : (
                            //이미지 추가 == s3에 업로드
                            <div className="absolute top-[15px] right-[15px]  bg-hobbing-red w-[30px] h-[30px] flex justify-center items-center rounded-full p-1">
                                <label htmlFor="inputFile" className="cursor-pointer">
                                    <ErrorMark rotate={45} color="#ffffff" />
                                </label>
                                <input type="file" id="inputFile" className="hidden" onChange={imageHandler} />
                            </div>
                        )}
                    </div>
                    <p className="font-bold text-[20px] text-center">{prevProfilData.name}</p>
                </section>
                <section className="relative w-4/5 h-[100px] flex justify-center">
                    <textarea
                        placeholder="상태메세지를 입력해주세요"
                        className="w-full h-full p-4 border-[1px] outline-none caret-hobbing-pink border-hobbing-red rounded-2xl text-[13px] bg-hobbing-light-pink"
                        value={profileMessage}
                        onChange={handleProfileMessageChange}
                        maxLength={49}
                    />
                    <p
                        className={`absolute bottom-[10px] right-[15px] text-[10px] ${profileMessageLength > 45 ? 'text-hobbing-red' : 'text-text-gray'} font-bold`}
                    >
                        {profileMessageLength} / 50
                    </p>
                </section>
                <section className="w-full h-[25%] flex justify-center items-center">
                    <form onSubmit={handleProfileEdit} className="w-full">
                        <button
                            type="submit"
                            className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                        >
                            <p className="font-Pretendard text-white text-[15px] font-bold">수정하기</p>
                            <RightArrow width={15} height={15} />
                        </button>
                    </form>
                </section>
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
            </main>
        </>
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
