'use client'

import BackArrow from '../images/BackArrow'
import { useRouter } from 'next/navigation'

export default function RouterBackArrowButton() {
    const router = useRouter()

    return (
        <div onClick={() => router.back()}>
            <BackArrow />
        </div>
    )
}
