import Link from 'next/link'

export default function CrewPage() {
    return (
        <>
            <div>소모임 둘러보기 페이지</div>
            <Link href={'/crew/crewcreate'} className="bg-red-200 flex">
                소모임 만들기
            </Link>
        </>
    )
}
