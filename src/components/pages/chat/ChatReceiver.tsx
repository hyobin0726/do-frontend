import { CrewMemberType } from '@/type/CrewType'

interface chatsType {
    uuid: string
    text?: string
    imageUrl?: string
    entryExitNotice?: string
    createdAt: string
}
export default function ChatReceiver({ chat, crewMembers }: { chat: chatsType; crewMembers: CrewMemberType[] }) {
    const member = crewMembers.find((member) => member.uuid === chat.uuid)
    // console.log('member:', member)
    return (
        <section>
            {chat.imageUrl && (
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <div className="bg-[#D9D9D9] rounded-full w-10 h-10 flex items-center justify-center text-sm">
                            프로필
                        </div>
                        <p className="text-xs text-gray-600 ml-1">사용자1</p>
                    </div>
                    <div className="flex mt-2 ml-2">
                        <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg w-fit justify-start">
                            <img src={chat.imageUrl} alt="Image" />
                        </div>
                        <div className="text-gray-500 text-sm ml-2 self-end">
                            {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                </div>
            )}
            {chat.text && (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                        <div className="bg-[#D9D9D9] rounded-full w-10 h-10 flex items-center justify-center text-sm">
                            프로필
                        </div>
                        <p className="text-xs text-gray-600 ml-1">사용자1</p>
                    </div>
                    <div className="flex flex-row">
                        <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg w-fit justify-start">
                            {chat.text}
                        </div>
                        <div className="text-gray-500 text-sm ml-2 self-end">
                            {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
