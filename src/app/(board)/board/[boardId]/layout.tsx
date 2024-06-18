import BoardBottom from '@/components/pages/board/BoardBottom'
import BoardDetailNav from '@/components/pages/board/BoardDetailNav'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <BoardDetailNav />
            {children}
            <BoardBottom />
        </main>
    )
}
