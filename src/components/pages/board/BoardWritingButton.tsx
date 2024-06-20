// 'use client'
import Pencil from '@/components/images/Pencil'
import Link from 'next/link'
export default function BoardWritingButton() {
    return (
        <div>
            <Link href={`/boardwriting`}>
                <div className="bg-hobbing-bg-pink rounded-full h-14 w-14 flex items-center justify-center shadow-md text-gray-500">
                    <Pencil />
                </div>
            </Link>
        </div>
    )
}
