'use client'

import BackArrow from '../images/BackArrow'
import { useRouter } from 'next/navigation'

export default function RouterBackArrowButton({ className }: { className?: string }) {
    const router = useRouter()

    return (
        <div className={className} onClick={() => router.back()}>
            <BackArrow />
        </div>
    )
}
