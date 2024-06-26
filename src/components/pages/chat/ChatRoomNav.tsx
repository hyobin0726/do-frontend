'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import { useEffect, useState } from 'react'
import ChatMenuModal from './ChatMenuModal'
import ShareKakao from '@/components/common/ShareKakao'
import { useParams, useRouter } from 'next/navigation'
import { useGetClientToken } from '@/actions/useGetClientToken'
import Alert from '@/components/common/Alert'
import { crewWithdrawal } from '@/api/crew/crewWithdrawal'
import getCrewInfo from '@/api/crew/getCrewInfo'
import { CrewInfoType } from '@/type/CrewType'

export default function ChatRoomNav() {
    const auth = useGetClientToken()
    const router = useRouter()
    const params = useParams<{ crewId: string }>()
    const [chatMenu, setChatMenu] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [isManager, setIsManager] = useState<boolean>(false)
    const [crew, setCrew] = useState<CrewInfoType>({} as CrewInfoType)
    useEffect(() => {
        const fetchCrew = async () => {
            const getCrew: CrewInfoType = await getCrewInfo({ crewId: params.crewId })
            setCrew(getCrew)
        }
        fetchCrew()
    }, [params.crewId])

    // 날짜형식고민
    const event = new Date()

    const disconnectChat = async () => {
        const BodyData = {
            crewId: params.crewId,
            connectionStatus: false,
            lastReadAt: event.toISOString(),
        }

        try {
            const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/connection`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${auth.token}`,
                },
                body: JSON.stringify(BodyData),
                cache: 'force-cache',
            })
            if (response.ok) {
                console.log('Last message info sent successfully')
            } else {
                console.error('Failed to send last message info')
            }
        } catch (error) {
            console.error('Error sending last message info:', error)
        }
    }
    const handleDeleteCrew = async () => {
        const withdrawal = await crewWithdrawal(params.crewId)
        if (withdrawal.isSuccess) {
            console.log('크루 탈퇴 완료 응답 데이터:', withdrawal)
            router.push('/chat')
        } else {
            console.error('크루 탈퇴 실패:', withdrawal.message)
            setIsManager(true)
        }
    }
    // console.log('퇴장', event.toISOString())
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            disconnectChat()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload)
        // }
    }, [])

    return (
        <nav>
            <div className="bg-white drop-shadow-sm bg-opacity-50 py-4 px-2 h-[70px] sticky top-0 z-[100]">

                <div className="relative  mx-auto px-2 flex items-center">
                    <div onClick={() => disconnectChat()}>
                        <RouterBackArrowButton />
                    </div>
                    <div className="flex items-center flex-col flex-1 ">
                        <p className="font-semibold">{crew?.name}</p>
                        <div className=" w-1/2 flex justify-center">
                            {crew && (
                                <ShareKakao
                                    thumbnail={crew.profileUrl}
                                    crewName={crew.name}
                                    crewIntroduction={crew.introduction}
                                    path={`boardlist/${params.crewId}`}
                                />
                            )}
                        </div>
                    </div>
                    <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/ios-glyphs/30/more.png"
                        alt="더보기"
                        className="ml-auto"
                        onClick={() => setChatMenu(true)}
                    />
                </div>
            </div>
            <ChatMenuModal
                crewName={crew?.name}
                chatMenuModal={chatMenu}
                setChatMenuModal={setChatMenu}
                crewId={params.crewId}
                setIsAlertOpen={setIsAlertOpen}
            />
            {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <div>
                        <p className="text-balance text-center text-[15px] leading-loose">채팅방을 나가시겠어요?</p>
                        <p className=" text-center text-[13px]">대화내용이 모두 삭제되고 복원이 불가능합니다.</p>
                    </div>
                    <div className=" space-x-5">
                        <button
                            onClick={() => {
                                setIsAlertOpen(false)
                            }}
                            className="w-[100px] h-[50px] bg-white rounded-xl text-[13px] text-hobbing-red border border-hobbing-red font-medium px-3"
                        >
                            취소하기
                        </button>
                        <button
                            onClick={() => {
                                handleDeleteCrew()
                            }}
                            className="w-[100px] h-[50px] bg-hobbing-red rounded-xl  text-[13px] text-white font-medium px-3"
                        >
                            나가기
                        </button>
                    </div>
                </Alert>
            )}
            {isManager && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <p className="text-balance text-center text-[15px] leading-loose">
                        방장은 소모임을 탈퇴할 수 없습니다.
                    </p>
                    <button
                        onClick={() => {
                            setIsAlertOpen(false)
                        }}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl  text-[13px] text-white font-medium px-3"
                    >
                        닫기
                    </button>
                </Alert>
            )}
        </nav>
    )
}
