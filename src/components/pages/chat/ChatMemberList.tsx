'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { GetCrewMember } from '@/api/crew/getCrewMember'
import Crew from '@/components/images/Crew'
import { useChatRoomStore } from '@/hooks/useChatRoleStore'
import { CrewMemberType } from '@/type/CrewType'
import { useEffect, useState } from 'react'

export default function ChatMemberList({ crewId }: { crewId: string }) {
    const auth = useGetClientToken()
    const [members, setMembers] = useState<CrewMemberType[]>([])
    const { setUserRole: setUserRole } = useChatRoomStore()

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData: CrewMemberType[] = await GetCrewMember({ crewId })
                setMembers(membersData)
                const user = membersData.find((member) => member.uuid === auth.uuid)
                if (user) {
                    setUserRole(user.role)
                }
            } catch (error) {
                console.error('Error fetching members:', error)
            }
        }
        fetchMembers()
    }, [crewId])

    return (
        <ul className=" space-y-3">
            <div className="flex items-center space-x-2 ">
                <div className="w-5">
                    <Crew isActive={false} />
                </div>
                <div className="text-[#869AA9]">참여자</div>
            </div>
            <div className="space-y-4 overflow-y-scroll h-[470px] scrollbar-hide">
                {members.map((member, idx) => (
                    <div key={idx} className="flex items-center  ">
                        <img src={member.profileUrl} alt="profile" className="w-10 h-10 rounded-full" />
                        <div className="ml-4 flex">
                            <div className="font-bold text-lg whitespace-nowrap">{member.name}</div>
                            {member.role === 3 && (
                                <div className="flex">
                                    <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2 whitespace-nowrap">
                                        방장
                                    </span>
                                    <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2 whitespace-nowrap">
                                        나
                                    </span>
                                </div>
                            )}
                            {member.role === 2 && (
                                <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2">나</span>
                            )}
                            {member.role === 1 && (
                                <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2">방장</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ul>
    )
}
