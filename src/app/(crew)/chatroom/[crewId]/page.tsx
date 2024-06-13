'use client'
import ChatOldMessage from '@/components/pages/chat/ChatOldMessage'
import ChatStreamMessage from '@/components/pages/chat/ChatStreamMessage'
import { useEffect, useRef, useState } from 'react'

export default function ChatRoomPage({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId

    const [currentPage, setCurrentPage] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)

    console.log('crewId:', crewId)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && !isFetching) {
                    setCurrentPage((prev) => prev + 1)
                }
            },
            {
                root: chatContainerRef.current,
                threshold: 1.0,
            },
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [isFetching])

    return (
        <section
            className="bg-[#F8F8F8] "
            ref={chatContainerRef}
            style={{
                height: '650px',
                overflow: 'scroll',
            }}
        >
            <div className=" px-2 py-4">
                <div ref={loaderRef} style={{ height: '0x' }}></div>
                <ChatOldMessage
                    currentPage={currentPage}
                    setIsFetching={setIsFetching}
                    chatContainerRef={chatContainerRef}
                />
                <ChatStreamMessage />
            </div>
        </section>
    )
}
