'use client'

import { useState } from 'react'

import RightArrow from '@/components/images/RightArrow'
import SliderModal from '@/components/common/SliderModal'
import getMyProfile from '@/api/auth/getMyProfile'
import getBaseRegion from '@/api/crew/getBaseRegion'

export default function CrewFormJoinButton({ crewId }: { crewId: number }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [joinMessage, setJoinMessage] = useState<string>('')
    const [profileUrl, setProfileUrl] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [gender, setGender] = useState<string>('')

    const modalController = () => {
        setIsModalOpen(!isModalOpen)
        getMyProfileData()
        getMyBaseRegion()
    }

    const getMyProfileData = async () => {
        const res = await getMyProfile()
        if (res) {
            console.log(res)
            setProfileUrl(res.profileImageUrl)
            setName(res.name)
            setBirthday(res.birth)
            setGender(res.gender == '여성' ? '여' : '남')
        }
    }

    const getMyBaseRegion = async () => {
        const res = await getBaseRegion()
        if (res) {
            console.log(res)
            setAddress(res.addressName)
        }
    }

    return (
        <>
            <button
                onClick={modalController}
                className="h-[50px] w-full rounded-xl flex flex-row justify-between items-center px-5 mb-4 mt-2 bg-white border-[2px] border-hobbing-red"
            >
                <p className="text-hobbing-red text-[13px] font-bold">가입 신청하기</p>
                <RightArrow color="#F76D67" />
            </button>
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true}>
                <div>test</div>
            </SliderModal>
        </>
    )
}
