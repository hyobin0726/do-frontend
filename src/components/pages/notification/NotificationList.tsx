'use client'
import TopSliderModal from '@/components/common/TopSliderModal'
import Image from 'next/image'
import Delete from '@/components/images/Delete'
import DeleteNotification from '@/api/notification/deletenotification'
import { on } from 'events'

interface notificationData {
    notificationId: string
    content: string
    crewProfileUrl: string
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
            modalController()
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
                        <div className="flex justify-between ">
                            <p className="text-xl font-bold">알림</p>
                            <button className="text-[#FD7A23] text-lg font-bold" onClick={() => modalController()}>
                                X
                            </button>
                        </div>
                        {notificationData &&
                            notificationData.map((notification: notificationData, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 p-2 border-b ">
                                    <Image
                                        src={notification.crewProfileUrl}
                                        alt="채팅방 프로필"
                                        width={40}
                                        height={40}
                                        className="rounded-xl w-[50px] h-[50px] object-cover "
                                        priority
                                    />
                                    <div className="flex justify-between space-x-2 w-[80%] items-center">
                                        <div className="">{notification.content}.</div>
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
