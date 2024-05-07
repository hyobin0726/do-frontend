import Link from 'next/link'

const MainNavigation = () => {
    return (
        <>
            <div className="flex flex-2  justify-around bg-fuchsia-400">
                <Link href={'/survey'}>추천취미</Link>
                <Link href={'/club'}>소모임</Link>
                <Link href={'/'}>홈</Link>
                <Link href={'/chat'}>채팅</Link>
                <Link href={'/mypage'}>마이페이지</Link>
            </div>
        </>
    )
}

export default MainNavigation
