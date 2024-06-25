import { CrewMemberType } from '@/type/CrewType'
import Image from 'next/image'

interface chatsType {
    uuid: string
    text?: string
    imageUrl?: string
    entryExitNotice?: string
    createdAt: string
}
export default function ChatReceiver({
    chat,
    crewMembers,
    memberUuid,
}: {
    chat: chatsType
    crewMembers: CrewMemberType[]
    memberUuid: string
}) {
    const nonUser = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1719328813438_Frame 1000004040.png'
    const member = crewMembers.find((member) => member.uuid === memberUuid)
    const name = member ? member.name : '(알 수 없음)'
    const profile = member ? member.profileUrl : nonUser
    // console.log('member:', member)
    return (
        <section>
            {chat.imageUrl && (
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <Image
                            src={profile}
                            alt="Profile"
                            width={500}
                            height={500}
                            className="rounded-full w-10 h-10 "
                        />
                        <p className="text-gray-600 ml-2">{name}</p>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="bg-white border border-[#E5EBEF] py-2 px-4 rounded-lg w-fit justify-start">
                            <img src={chat.imageUrl} alt="Image" className="w-[200px]" />
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
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <Image
                            src={profile}
                            alt="Profile"
                            width={500}
                            height={500}
                            className="rounded-full w-10 h-10 "
                        />
                        <p className="text-gray-600 ml-2">{name}</p>
                    </div>
                    <div className="flex flex-row m-5">
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
