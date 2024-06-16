import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'
import BoardNav from '@/components/pages/board/BoardNav'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    const crew = [
        {
            crewId: '1',
            name: '해운대 크루',
            profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
        },
        {
            crewId: '2',
            name: '광안리 크루',
            profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
        },
        {
            crewId: '3',
            name: '괴정 크루',
            profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
        },
    ]
    return (
        <>
            <MainHeader title="게시판" />
            <BoardNav crew={crew} />
            {children}
            <MainNavigation />
        </>
    )
}
