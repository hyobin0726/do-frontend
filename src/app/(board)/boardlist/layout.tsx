import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'
import BoardWritingButton from '@/components/pages/board/BoardWritingButton'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <MainHeader title="게시판" />
            {children}
            <div className=" bottom-20 right-2 fixed z-[1000]">
                <BoardWritingButton />
            </div>
            <MainNavigation />
        </main>
    )
}
