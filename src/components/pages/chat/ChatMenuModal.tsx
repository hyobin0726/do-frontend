import Link from 'next/link'
import ChatLeave from '@/components/images/ChatLeave'
import Setting from '@/components/images/Setting'
import ChatAlbumButton from './ChatAlbumButton'
import ChatMemberList from './ChatMemberList'
import { useChatRoomStore } from '@/hooks/useChatRoleStore'

export default function ChatMenuModal({
    crewName,
    chatMenuModal,
    setChatMenuModal,
    crewId,
    setIsAlertOpen,
}: {
    crewName: string
    chatMenuModal: boolean
    setChatMenuModal: React.Dispatch<React.SetStateAction<boolean>>
    crewId: string
    setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const handleDeleteButton = () => {
        setChatMenuModal(false)
        setIsAlertOpen(true)
    }
    const { userRole } = useChatRoomStore()
    // console.log('userRole:', userRole)

    return (
        <section>
            {chatMenuModal && (
                <div className="fixed top-0 z-[200] w-screen h-screen bg-black bg-opacity-30">
                    <div className="bg-white w-2/3 fixed right-0 h-screen p-4 flex flex-col justify-between">
                        <div className=" space-y-5">
                            <div className="flex justify-between ">
                                <div className="font-bold text-lg">{crewName} 서랍</div>
                                <button
                                    className="text-[#FD7A23] text-lg font-bold"
                                    onClick={() => setChatMenuModal(false)}
                                >
                                    X
                                </button>
                            </div>
                            <ChatAlbumButton crewId={crewId} />
                            <ChatMemberList crewId={crewId} />
                        </div>
                        <div className="flex justify-between mt-auto">
                            <button className="flex items-center space-x-2" onClick={handleDeleteButton}>
                                <div className="w-5 h-5">
                                    <ChatLeave />
                                </div>
                                <p className="text-[#F76D67]">채팅방 나가기</p>
                            </button>
                            {userRole === 1 && (
                                <Link href={`/crewsetting/${crewId}`} className="w-5 h-5">
                                    <Setting />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
