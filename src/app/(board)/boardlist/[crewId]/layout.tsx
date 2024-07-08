import BoardWritingButton from '@/components/pages/board/BoardWritingButton'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <aside className=" bottom-24 right-2 fixed z-[900]">
                <BoardWritingButton />
            </aside>
        </>
    )
}
