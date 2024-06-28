import MainNavigation from '@/components/layouts/MainNavigation'
import Notification from '@/components/images/Notification'
import MainHeader from '@/components/layouts/MainHeader'
import NotificationButton from '@/components/pages/notification/notificationButton'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="채팅방">
                <NotificationButton />
            </MainHeader>
            {children}
            <MainNavigation />
        </>
    )
}
