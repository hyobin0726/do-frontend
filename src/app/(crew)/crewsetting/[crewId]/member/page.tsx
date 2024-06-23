'use client'
import { useEffect, useState } from 'react'
import { GetCrewMember } from '@/api/crew/getCrewMember'
import CrewRole from '@/components/images/CrewRole'
import { CrewMemberType } from '@/type/CrewType'
import { postMemberExit } from '@/api/crew/postMemberExit'

export default function MemberList({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const [members, setMembers] = useState<CrewMemberType[]>([])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData: CrewMemberType[] = await GetCrewMember({ crewId })
                setMembers(membersData)
            } catch (error) {
                console.error('Error fetching members:', error)
            }
        }
        fetchMembers()
    }, [crewId])

    const handleMemberDelete = async (outUuid: string) => {
        try {
            await postMemberExit({ crewId, outUuid })
            console.log('Member exit response:')
        } catch (error) {
            console.error('Error while deleting member:', error)
        }
    }

    return (
        <div>
            <div className="max-w-lg mx-auto bg-white p-5 space-y-5">
                <h1 className="text-xl font-medium border-b-[1px] border-hobbing-pink pb-2 text-center">회원 정보</h1>
            </div>
            {members.map((member, idx) => (
                <div key={idx} className="max-w-lg mx-auto bg-white p-5 space-y-5">
                    <div className="flex justify-between">
                        <div className="flex flex-row items-center">
                            <img src={member.profileUrl} alt="profile" className="w-10 h-10 rounded-full" />
                            <p className="ml-2">{member.name}</p>
                            {member.role === 1 && <CrewRole />}
                        </div>
                        {member.role === 0 && (
                            <button
                                onClick={() => handleMemberDelete(member.uuid)}
                                className="w-[20%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
                            >
                                <p className="font-Pretendard text-white text-[13px] font-bold">내보내기</p>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
