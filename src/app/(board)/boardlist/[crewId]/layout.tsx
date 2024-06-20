import BoardWritingButton from '@/components/pages/board/BoardWritingButton'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <aside className=" bottom-20 right-2 fixed z-[1000]">
                <BoardWritingButton />
            </aside>
        </>
    )
}
