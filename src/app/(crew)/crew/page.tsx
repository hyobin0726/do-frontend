import Link from 'next/link'
import MainNavigation from '@/components/layouts/MainNavigation'

export default function CrewPage() {
    return (
        <>
            <div>소모임 둘러보기 페이지</div>
            <Link href={'/crew/crewcreate'} className="bg-red-200 flex">
                소모임 만들기
            </Link>
            <MainNavigation />
        </>
    )
}
