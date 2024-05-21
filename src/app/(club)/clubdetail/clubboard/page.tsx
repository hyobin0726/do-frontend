import Link from 'next/link'

function ClubBoard() {
    return (
        <div>
            <Link href={'/clubbulletin/1'} className="bg-red-100 flex">
                소모임 게시글입니다 클릭하면 게시글로 이동
            </Link>
            <Link href={'/clubwriting'} className="bg-red-200 flex">
                글쓰기로 이동
            </Link>
        </div>
    )
}
export default ClubBoard
