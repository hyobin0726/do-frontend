'use client'
import TopSliderModal from '@/components/common/TopSliderModal'
import Image from 'next/image'
import Delete from '@/components/images/Delete'
import DeleteNotification from '@/api/notification/deletenotification'

interface notificationData {
    notificationId: string
    content: string
    crewProfileUrl: string
    crewName: string
    createdAt: string
}

export default function NotificationList({
    isModalOpen,
    modalController,
    notificationData,
    onDeleteNotification,
}: {
    isModalOpen: boolean
    modalController: () => void
    notificationData: notificationData[]
    onDeleteNotification: (notificationId: string) => void
}) {
    const handleDelete = async (notificationId: string) => {
        try {
            await DeleteNotification(notificationId)
            onDeleteNotification(notificationId)
        } catch (error) {
            console.error('알림 삭제에 실패했습니다:', error)
        }
    }
    return (
        <>
            <div className="z-[950] fixed flex items-end justify-center ">
                <TopSliderModal
                    isModalOpen={isModalOpen}
                    onChangeModal={modalController}
                    backgroundClose={true}
                    top={true}
                >
                    <div className="h-[500px] space-y-4 p-3 overflow-y-scroll scrollbar-hide w-full ">
                        <div className="flex justify-between px-2">
                            <p className="text-xl font-bold">알림</p>
                            <button className="text-[#FD7A23] text-[20px] font-bold" onClick={() => modalController()}>
                                X
                            </button>
                        </div>
                        {notificationData &&
                            notificationData.map((notification: notificationData, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-2 border-b">
                                    <div className="flex flex-row space-x-2 w-[80%] items-center">
                                        <Image
                                            src={notification.crewProfileUrl}
                                            alt="채팅방 프로필"
                                            width={40}
                                            height={40}
                                            className="rounded-xl w-[50px] h-[50px] object-cover "
                                            priority
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex space-x-2 items-center ">
                                                <p className=" whitespace-nowrap font-bold">{notification.crewName} </p>
                                                <p className="text-xs  text-gray-400 whitespace-nowrap ">
                                                    (
                                                    {new Date(notification.createdAt).toLocaleTimeString('ko-KR', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                    )
                                                </p>
                                            </div>
                                            <p>{notification.content}.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="w-4 h-4"
                                            onClick={() => handleDelete(notification.notificationId)}
                                        >
                                            <Delete />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </TopSliderModal>
            </div>
        </>
    )
}
