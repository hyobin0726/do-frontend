import Album from '@/components/images/Album'
import ChatLeave from '@/components/images/ChatLeave'
import Crew from '@/components/images/Crew'
import Setting from '@/components/images/Setting'
import Link from 'next/link'

export default function ChatMenuModal({
    chatMenuModal,
    setChatMenuModal,
    crewId,
    setIsAlertOpen,
}: {
    chatMenuModal: boolean
    setChatMenuModal: React.Dispatch<React.SetStateAction<boolean>>
    crewId: string
    setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    console.log('crewId:', crewId)
    const crew = [
        {
            id: 1,
            name: '박효빈',
            role: 1,
        },
        {
            id: 2,
            name: '김예진',
            role: 0,
        },
        {
            id: 3,
            name: '김선욱',
            role: 0,
        },
        {
            id: 4,
            name: '홍준표',
            role: 0,
        },
        {
            id: 5,
            name: '이선주',
            role: 0,
        },
    ]
    const handleDeleteButton = () => {
        setChatMenuModal(false)
        setIsAlertOpen(true)
    }

    return (
        <>
            {chatMenuModal && (
                <div className="fixed top-0 z-[2] w-screen h-screen bg-black bg-opacity-30">
                    <div className="bg-white w-2/3 fixed right-0 h-screen p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between mb-4">
                                <div className="font-bold text-lg">해운대 크루 서랍</div>

                                <button
                                    className="text-[#FD7A23] text-lg font-bold"
                                    onClick={() => setChatMenuModal(false)}
                                >
                                    X
                                </button>
                            </div>
                            <Link href={`/chatimglist/${crewId}`} className="flex items-center space-x-2 mt-2">
                                <div className="w-5">
                                    <Album />
                                </div>
                                <div className="text-[#869AA9] ml-2">사진</div>
                            </Link>
                            <ul>
                                <div className="flex items-center space-x-2 mt-2 mb-2">
                                    <div className="w-5">
                                        <Crew isActive={false} />
                                    </div>
                                    <div className="text-[#869AA9]">참여자</div>
                                </div>
                                <div>
                                    {crew.map((member) => (
                                        <div key={member.id} className="flex items-center p-1">
                                            <div className="bg-[#D9D9D9] rounded-full w-14 h-14 flex items-center justify-center text-sm">
                                                프로필
                                            </div>
                                            <div className="ml-4 flex">
                                                <div className="font-bold text-lg">{member.name}</div>
                                                {member.role === 1 && (
                                                    <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2">
                                                        방장
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ul>
                        </div>
                        <div className="flex justify-between mt-auto">
                            <button className="flex items-center space-x-2" onClick={handleDeleteButton}>
                                <div className="w-5 h-5">
                                    <ChatLeave />
                                </div>
                                <p className="text-[#F76D67]">채팅방 나가기</p>
                            </button>
                            <Link href={`/crewsetting/${crewId}`} className="w-5 h-5">
                                <Setting />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
