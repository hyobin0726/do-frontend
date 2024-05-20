import Link from 'next/link'
export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-2  justify-around bg-fuchsia-400">
                <Link href={'/clubdetail/clubhome'}>홈</Link>
                <Link href={'/clubdetail/clubboard'}>게시판</Link>
                <Link href={'/chat'}>채팅</Link>
            </div>
            {children}
        </>
    )
}
