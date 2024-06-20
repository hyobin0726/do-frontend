import MainNavigation from '@/components/layouts/MainNavigation'
import Notification from '@/components/images/Notification'
import MainHeader from '@/components/layouts/MainHeader'
import Search from '@/components/images/Search'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="채팅">
                <div className="w-5 h-full">
                    <Search />
                </div>
                <div className="w-5 h-full">
                    <Notification />
                </div>
            </MainHeader>
            {children}
            <MainNavigation />
        </>
    )
}
