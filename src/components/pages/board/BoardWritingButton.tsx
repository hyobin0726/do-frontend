'use client'
import { useBoardStore } from '@/hooks/useBoardStore'
import Link from 'next/link'
export default function BoardWritingButton() {
    const { selectedCrewId } = useBoardStore()
    console.log('selectedCrewId', selectedCrewId)

    return (
        <div>
            <Link href={`/boardwriting/${selectedCrewId}`}>
                <div className="bg-hobbing-bg-pink rounded-full h-12 w-24 flex items-center justify-center shadow-md text-gray-500">
                    글쓰기
                </div>
            </Link>
        </div>
    )
}
