'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import RightArrow from '@/components/images/RightArrow'
import CrewCreateForm from '@/components/pages/crew/CrewCreateForm'
import CrewCreateSelect from '@/components/pages/crew/CrewCreateSelect'
import CrewImageUpload from '@/components/pages/crew/CrewImageUpload'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function CrewCreate() {
    const auth = useGetClientToken()
    const router = useRouter()
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [regionId, setRegionId] = useState<string>('')
    const [hobbyId, setHobbyId] = useState<string>('')
    const [crewName, setCrewName] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [hashTagList, setHashTagList] = useState<string[]>([])
    const [JoinType, setJoinType] = useState<number>(0)

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
    const handleJoinType = (JoinType: number) => {
        setJoinType(JoinType)
    }
    const uploadImageToS3 = async (imageFile: File): Promise<string | null> => {
        const formData = new FormData()
        formData.append('img', imageFile) // 'profileUrl' 대신 'img'로 수정 (API에 맞게)

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

    const handleCreateCrew = async () => {
        if (!regionId || !hobbyId || !crewName || !introduction) {
            alert('필수 항목을 모두 입력해 주세요.')
            return
        }
        let imgUrl: string | null = null

        if (profileImage) {
            imgUrl = await uploadImageToS3(profileImage)
            if (!imgUrl) {
                console.error('이미지 URL을 가져오는데 실패했습니다.')
                return
            }
        }

        const bodyData = {
            profileUrl: imgUrl,
            regionId: regionId,
            hobbyId: hobbyId,
            name: crewName,
            introduction: introduction,
            hashTagList: hashTagList,
            joinType: JoinType,
        }
        console.log('전송할 데이터:', bodyData)
        try {
            const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew`, {
                method: 'POST',
                headers: {
                    Authorization: `${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            })
            const responseData = await response.json()

            if (responseData.isSuccess === true) {
                console.log('크루 생성 완료 응답 데이터:', responseData)

                alert('크루가 생성되었습니다.')
                router.push('/')
            } else {
                if (responseData.status === 'CREW403') {
                    alert('한 회원은 최대 5개 소모임 생성이 가능합니다.')
                } else {
                    console.error('크루 생성 실패:', responseData.message)
                    window.location.reload()
                }
            }
            console.log('전송한 데이터:', bodyData)
        } catch (error) {
            console.error('네트워크 에러:', error)
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleCreateCrew()
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
