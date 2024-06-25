import { CrewMemberType } from '@/type/CrewType'

export default function ChatEntryNotice({
    entryExitNotice,
    entryUuid,
    crewMembers,
}: {
    entryExitNotice: string
    entryUuid: string
    crewMembers: CrewMemberType[]
}) {
    const member = crewMembers.find((member) => member.uuid === entryUuid)
    const noticeMessage = member ? `${member.name}${entryExitNotice}` : ''
    return (
        <div className="flex justify-center mb-4">
            <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">{noticeMessage}</div>
        </div>
    )
}
