'use client'
import { useEffect, useState } from 'react'
import { CrewMemberType } from '@/type/CrewType'
import { GetCrewMember } from '@/api/crew/getCrewMember'
import { postMemberExit } from '@/api/crew/postMemberExit'
import CrewRole from '@/components/images/CrewRole'
import Alert from '@/components/common/Alert'

export default function CrewMemberList({
    crewId,
    membersDataList,
}: {
    crewId: string
    membersDataList: CrewMemberType[]
}) {
    const members = membersDataList
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string>('')

    const handleDeleteButton = (outUuid: string) => {
        setSelectedMember(outUuid)
        setIsAlertOpen(true)
    }

    const handleMemberDelete = async () => {
        try {
            await postMemberExit({ crewId, outUuid: selectedMember })
            console.log('Member exit response:')
        } catch (error) {
            console.error('Error while deleting member:', error)
        }
    }
    console.log('members:', members)
    return (
        <section>
            {members.map((member, idx) => (
                <div key={idx} className=" bg-white p-5 space-y-5">
                    <div className="flex justify-between">
                        <div className="flex flex-row items-center">
                            <img src={member.profileUrl} alt="profile" className="w-10 h-10 rounded-full" />
                            <p className="ml-2">{member.name}</p>
                            {member.role === 1 && <CrewRole />}
                        </div>
                        {member.role === 0 && (
                            <button
                                onClick={() => handleDeleteButton(member.uuid)}
                                className="w-[20%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
                            >
                                <p className="font-Pretendard text-white text-[13px] font-bold">내보내기</p>
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <div>
                        <p className="text-balance text-center text-[15px] leading-loose">
                            회원을 내보내고 이 채팅방에 더이상 참여하지 못하게 합니다.
                        </p>
                    </div>
                    <div className=" space-x-5">
                        <button
                            onClick={() => {
                                setIsAlertOpen(false)
                            }}
                            className="w-[100px] h-[50px] bg-white rounded-xl text-[13px] text-hobbing-red border border-hobbing-red font-medium px-3"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => {
                                handleMemberDelete()
                                setIsAlertOpen(false)
                            }}
                            className="w-[100px] h-[50px] bg-hobbing-red rounded-xl  text-[13px] text-white font-medium px-3"
                        >
                            내보내기
                        </button>
                    </div>
                </Alert>
            )}
        </section>
    )
}
