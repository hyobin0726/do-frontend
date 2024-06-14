import Link from 'next/link'

function BoardPage() {
    return (
        <div>
            <Link href={'/board/1'} className="bg-red-100 flex">
                소모임 게시글입니다 클릭하면 게시글로 이동
            </Link>
            <Link href={'/boardwriting'} className="bg-red-200 flex">
                글쓰기로 이동
            </Link>
        </div>
    )
}
export default BoardPage
