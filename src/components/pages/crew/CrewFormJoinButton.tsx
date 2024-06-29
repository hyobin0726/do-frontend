'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import postFormJoin from '@/api/crew/postFormJoin'

import RightArrow from '@/components/images/RightArrow'
import SliderModal from '@/components/common/SliderModal'
import getBaseRegion from '@/api/crew/getBaseRegion'
import getMyProfile from '@/api/auth/getMyProfile'

interface crewJoinFormtype {
    joinMessage: string
    profileUrl: string
    name: string
    birthday: string
    address: string
    gender: string
}

export default function CrewFormJoinButton({
    crewId,
    crewName,
    token,
}: {
    crewId: number
    crewName: string
    token: string | undefined
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [errorMesage, setErrorMessage] = useState<string>('')
    const [isAlreadyJoin, setIsAlreadyJoin] = useState<boolean>(false)
    const [joinInfo, setJoinInfo] = useState<crewJoinFormtype>({
        joinMessage: '',
        profileUrl: '',
        name: '',
        birthday: '',
        address: '',
        gender: '',
    } as crewJoinFormtype)

    const router = useRouter()

    const modalController = () => {
        setIsModalOpen(!isModalOpen)
        getMyProfileData()
        getMyBaseRegion()
        setJoinInfo((prevjoinInfo) => ({
            ...prevjoinInfo,
            joinMessage: '',
        }))
        setErrorMessage('')
    }

    const getMyProfileData = async () => {
        const res = await getMyProfile(token)
        if (res) {
            setJoinInfo((prevjoinInfo) => ({
                ...prevjoinInfo,
                profileUrl: res.profileImageUrl,
                name: res.name,
                birthday: res.birth,
                gender: res.gender === '여성' ? '여' : '남',
            }))
        }
    }

    const getMyBaseRegion = async () => {
        const res = await getBaseRegion(token)
        if (res) {
            setJoinInfo((prevjoinInfo) => ({
                ...prevjoinInfo,
                address: res.addressName,
            }))
        }
    }

    const handleJoinMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJoinInfo((prevjoinInfo) => ({
            ...prevjoinInfo,
            joinMessage: e.target.value.replace(/\n/g, ' '),
        }))
        if (e.target.value.trim().length > 0) {
            setErrorMessage('')
        }
    }

    const handleFormJoin = async () => {
        if (joinInfo.joinMessage.trim().length < 1) {
            setErrorMessage('가입 메세지를 입력해주세요')
            return
        }

        if (joinInfo.joinMessage.trim().length > 50) {
            setErrorMessage('50자 이내로 작성해주세요')
            return
        }

        if (
            joinInfo.profileUrl === '' ||
            joinInfo.name === '' ||
            joinInfo.birthday === '' ||
            joinInfo.address === '' ||
            joinInfo.gender === ''
        ) {
            setErrorMessage('잠시 후 다시 시도해주세요')
            return
        }

        const res = await postFormJoin(crewId, joinInfo)
        if (res.isSuccess) {
            router.push('/mypage/crew-apply')
        } else {
            setErrorMessage(res.message)
            setIsAlreadyJoin(true)
        }
    }

    return (
        <>
            <button
                onClick={modalController}
                className="h-[50px] w-full rounded-xl flex flex-row justify-between items-center px-5 bg-white border-[2px] border-hobbing-red"
            >
                <p className="text-hobbing-red text-[13px] font-bold">가입 신청하기</p>
                <RightArrow color="#F76D67" />
            </button>
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true}>
                <div className="w-full h-auto flex flex-col justify-center items-center py-4 space-y-2">
                    <p className=" text-[20px] text-center">
                        <span className="font-bold ">{crewName}</span>에 <br />
                        가입메세지를 남겨주세요.
                    </p>
                    <p className="text-[15px] text-center text-text-gray">
                        가입신청서는 마이페이지에서 확인 가능합니다.
                        <br />
                        10일이내 승인이 없을 시 자동으로 취소됩니다.
                    </p>
                </div>
                <div className="relative w-4/5 h-[100px] flex justify-center">
                    <textarea
                        placeholder="가입메세지를 입력해주세요"
                        className="w-full h-full p-4 border-[1px] outline-none caret-hobbing-pink border-hobbing-red rounded-2xl text-[13px] bg-hobbing-light-pink"
                        value={joinInfo.joinMessage}
                        onChange={handleJoinMessageChange}
                        maxLength={49}
                    />
                    <p
                        className={`absolute bottom-[10px] right-[15px] text-[10px] ${joinInfo.joinMessage.trim().length > 45 ? 'text-hobbing-red' : 'text-text-gray'} font-bold`}
                    >
                        {joinInfo.joinMessage.trim().length} / 50
                    </p>
                </div>
                {errorMesage && <p className="text-[12px] text-hobbing-red font-bold py-3">**{errorMesage}**</p>}
                {isAlreadyJoin ? (
                    <div
                        className={`w-full h-auto flex flex-row justify-center space-x-3 ${errorMesage ? '' : 'pt-5'}`}
                    >
                        <button
                            onClick={() => {
                                router.push('/mypage/crew-apply')
                            }}
                            className="w-auto h-[40px] bg-hobbing-red rounded-xl font-Pretendard text-[14px] text-white font-medium px-4"
                        >
                            가입신청서 확인하기
                        </button>
                    </div>
                ) : (
                    <div
                        className={`w-full h-auto flex flex-row justify-center space-x-4 ${errorMesage ? '' : 'pt-5'}`}
                    >
                        <button
                            onClick={handleFormJoin}
                            className="w-[80px] h-[45px] bg-hobbing-red rounded-xl font-Pretendard text-[14px] text-white font-medium px-4"
                        >
                            확인
                        </button>
                        <button
                            onClick={() => {
                                setIsModalOpen(!isModalOpen)
                            }}
                            className="w-[80px] h-[45px] bg-white border-[1px] border-hobbing-red text-hobbing-red rounded-xl font-Pretendard text-[14px] font-medium px-3"
                        >
                            닫기
                        </button>
                    </div>
                )}
            </SliderModal>
        </>
    )
}
