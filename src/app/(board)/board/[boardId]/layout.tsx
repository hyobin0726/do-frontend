import BoardDetailNav from '@/components/pages/board/BoardDetailNav'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <BoardDetailNav />
            {children}
        </main>
    )
}
