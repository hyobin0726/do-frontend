'use client'
import Notification from '@/components/images/Notification'
import { useEffect, useState } from 'react'
import NotificationList from './NotificationList'
import getNotificationList from '@/api/notification/getnotificationList'
import { useGetClientToken } from '@/actions/useGetClientToken'

interface notificationData {
    notificationId: string
    content: string
    crewProfileUrl: string
}

export default function NotificationButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [notificationData, setNotificationData] = useState<notificationData[]>([])
    const auth = useGetClientToken()
    console.log('auth:', auth.token)
    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
        const fetchNotification = async () => {
            const getData = await getNotificationList()
            setNotificationData(getData.data)
        }
        fetchNotification()
    }, [])

    const handleDeleteNotification = (notificationId: string) => {
        const updatedNotifications = notificationData.filter(
            (notification) => notification.notificationId !== notificationId,
        )
        setNotificationData(updatedNotifications)
    }
    return (
        <>
            <button onClick={modalController}>
                <div className="w-5 h-full">
                    <Notification />
                </div>
                {notificationData.length > 0 && (
                    <div className="w-2.5 h-2.5 rounded-full bg-hobbing-red absolute top-4 right-4" />
                )}
            </button>
            <NotificationList
                isModalOpen={isModalOpen}
                modalController={modalController}
                notificationData={notificationData}
                onDeleteNotification={handleDeleteNotification}
            />
        </>
    )
}
