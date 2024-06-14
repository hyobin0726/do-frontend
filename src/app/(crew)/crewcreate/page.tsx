'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import RightArrow from '@/components/images/RightArrow'
import CrewCreateForm from '@/components/pages/crew/CrewCreateForm'
import CrewCreateSelect from '@/components/pages/crew/CrewCreateSelect'
import CrewImageUpload from '@/components/pages/crew/CrewImageUpload'
import { useState } from 'react'

function CrewCreate() {
    const auth = useGetClientToken()
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [regionId, setRegionId] = useState<string>('')
    const [hobbyId, setHobbyId] = useState<string>('')
    const [crewName, setCrewName] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [hashTagList, setHashTagList] = useState<string[]>([])
    const [JoinType, setJoinType] = useState<string>('public')

    const handleImageSelected = (imageFile: File | null) => {
        setProfileImage(imageFile)
    }
    const handleAddressSelected = (regionId: string) => {
        setRegionId(regionId)
    }
    const handleHobbySelected = (hobbyId: string) => {
        setHobbyId(hobbyId)
    }
    const handleCrewName = (crewName: string) => {
        setCrewName(crewName)
    }
    const handleIntroduction = (introduction: string) => {
        setIntroduction(introduction)
    }
    const handleHashTagList = (hashTagList: string[]) => {
        setHashTagList(hashTagList)
    }
    const handleJoinType = (JoinType: string) => {
        setJoinType(JoinType)
    }
    const profileUrl = async () => {
        if (!profileImage) {
            return
        }
        const formData = new FormData()
        formData.append('profileUrl', profileImage)

        try {
            const response = await fetch('/api/s3-upload', {
                method: 'POST',
                body: formData,
            }).then((res) => res.json())
            if (response.message == 'OK') {
                console.log('이미지 저장 완료')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleCreateCrew = async (imgUrl: string | null) => {
        if (!profileImage) {
            return
        }
        profileUrl()
        const bodyData = {
            profileUrl: imgUrl,
            regionId: regionId,
            hobbyId: hobbyId,
            name: crewName,
            introduction: introduction,
            hashTagList: hashTagList,
            joinType: JoinType,
        }

        try {
            const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew`, {
                method: 'POST',
                headers: {
                    Authorization: `${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            })

            if (response.ok) {
                console.log('크루 생성 완료')
                console.log(bodyData, 'bodyData')
            } else {
                const errorData = await response.json()
                console.error('크루 생성 실패:', errorData.message)
            }
        } catch (error) {
            console.error('네트워크 에러:', error)
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleCreateCrew(null)
    }

    return (
        <form className="flex flex-col items-center space-y-4 p-5" onSubmit={handleSubmit}>
            <CrewImageUpload onImageSelected={handleImageSelected} />
            <CrewCreateSelect onAddressSelect={handleAddressSelected} onHobbySelected={handleHobbySelected} />
            <CrewCreateForm
                onCrewName={handleCrewName}
                onIntroduction={handleIntroduction}
                onHashTagList={handleHashTagList}
                onJoinType={handleJoinType}
            />
            <button
                type="submit"
                className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 text-[15px] font-bold text-white"
            >
                <span>소모임 생성</span>
                <RightArrow width={15} height={15} />
            </button>
        </form>
    )
}
export default CrewCreate
