'use client'
import Notification from '@/components/images/Notification'
import { useEffect, useState } from 'react'
import NotificationList from './NotificationList'
import getNotificationList from '@/api/notification/getnotificationList'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { EventSourcePolyfill } from 'event-source-polyfill'

interface notificationData {
    notificationId: string
    content: string
    crewProfileUrl: string
    crewName: string
    createdAt: string
}

export default function NotificationButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [notificationData, setNotificationData] = useState<notificationData[]>([])
    const auth = useGetClientToken()
    // console.log('auth:', auth.token)
    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
        const fetchNotification = async () => {
            const getData = await getNotificationList()
            console.log(getData.data, 'restapi 알림')
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
    useEffect(() => {
        if (!auth.token) return
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(
                `${process.env.BASE_URL}/crew-service/v1/users/notification/subscribe`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `${auth.token}`,
                    },
                },
            )
            eventSource.onmessage = (event) => {
                try {
                    const newMessage = JSON.parse(event.data)

                    console.log(newMessage, '실시간 알림')
                    if (newMessage) {
                        setNotificationData((prevData) => [newMessage, ...prevData])
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error)
                }
            }
            eventSource.onerror = (error) => {
                console.error('EventSource failed: ', error)
                eventSource.close()
                setTimeout(() => {
                    connectToSSE()
                }, 5000)
            }
            return eventSource
        }
        const eventSource = connectToSSE()

        return () => {
            eventSource.close()
        }
    }, [auth.token])

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
                // notificationMessage={notificationMessage}
            />
        </>
    )
}
