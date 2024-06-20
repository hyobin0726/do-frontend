import Chat from '@/components/images/Chat'
import Crew from '@/components/images/Crew'
import Folder from '@/components/images/Folder'
import Home from '@/components/images/Home'

interface MainNavigationDataType {
    id: number
    title: string
    icon: React.ComponentType<{ isActive: boolean }>
    url: string
}

export const MainNavigationData: MainNavigationDataType[] = [
    {
        id: 1,
        title: '소모임',
        icon: Crew,
        url: '/crew',
    },
    {
        id: 2,
        title: '게시판',
        icon: Folder,
        url: '/boardlist',
    },
    {
        id: 3,
        title: 'Home',
        icon: Home,
        url: '/',
    },
    {
        id: 4,
        title: '채팅',
        icon: Chat,
        url: '/chat',
    },
    {
        id: 5,
        title: '마이페이지',
        icon: Crew,
        url: '/mypage',
    },
]
